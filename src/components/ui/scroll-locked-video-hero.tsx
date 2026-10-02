"use client"

import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// ─────────────────────────────────────────────────────────────
// Locked scroll-scrub video hero.
//
// While active, the page is pinned (body position:fixed) and wheel,
// touch and keyboard input only drive video.currentTime, forward and
// backward. Once the video has reached the end and the visitor keeps
// pushing forward, the page unlocks and scrolls normally. Scrolling
// back up to the very top re-locks it.
//
// Differences from the original snippet, all so the page stays usable:
//   - it actually unlocks at the end (the original never did)
//   - keyboard keys (arrows, space, page up/down, home/end) work
//   - clicking an in-page link (#services, #contact) skips ahead
//   - prefers-reduced-motion: no lock, the final frame is shown
// ─────────────────────────────────────────────────────────────

export interface ScrollLockedVideoHeroProps {
  videoSrc: string
  /** Lighter file for small screens (max-width 768px). Falls back to `videoSrc`. */
  videoSrcMobile?: string
  title?: string
  scrollHint?: string
  tagline?: string
  /** Story beats shown as the video plays. `at` is the progress (0 to 1) where each begins. */
  stages?: { at: number; label: string; caption: string }[]
  /** Shown near the end of the video, e.g. call-to-action buttons. */
  endContent?: React.ReactNode
  /** Image shown while the video loads. */
  poster?: string
  signature?: { name: string; url: string } | false
  /** Total input distance (px) needed to scrub the full video. */
  scrubDistance?: number
  /** Extra forward input (px) after the last frame before the page unlocks. */
  releaseDistance?: number
  /** Touch swipes are short, so each swipe pixel counts this many times. */
  touchMultiplier?: number
  className?: string
  style?: React.CSSProperties
}

const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
const COL_BG = "#1c1814"
const COL_TEXT = "#fffaf3"

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export default function ScrollLockedVideoHero({
  videoSrc,
  videoSrcMobile,
  title = "THE CITY OPENS",
  scrollHint = "SCROLL",
  tagline,
  stages,
  endContent,
  poster,
  signature = false,
  scrubDistance = 3200,
  releaseDistance = 260,
  touchMultiplier = 1.8,
  className,
  style,
}: ScrollLockedVideoHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const titleLineRefs = useRef<(HTMLSpanElement | null)[]>([])
  const hintRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const stagesRef = useRef(stages ?? [])
  const endRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [stage, setStage] = useState(0)
  // "Know your land. Plan your home." becomes one line per sentence.
  const titleLines = title.match(/[^.!?]+[.!?]*/g)?.map((line) => line.trim()).filter(Boolean) ?? [title]

  useEffect(() => {
    const videoEl = videoRef.current
    const section = sectionRef.current
    if (!videoEl || !section) return
    const video: HTMLVideoElement = videoEl

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

    let duration = 0
    let rafId = 0
    let targetProgress = 0
    let currentProgress = 0
    let overshoot = 0
    let hasStartedScrolling = false
    let isSeeking = false
    let pendingTime: number | null = null
    let locked = false
    let lockedScrollY = 0
    let touchStartY = 0

    const onLoadedData = () => {
      duration = video.duration || 0
      setReady(true)
      if (reduceMotion) video.currentTime = Math.max(0, duration - 0.05)
    }
    video.addEventListener("loadeddata", onLoadedData)
    video.addEventListener("durationchange", onLoadedData)
    // A fast or cached load can finish before this effect runs, so the
    // events above would never fire. Pick up the state that is already there.
    if (video.readyState >= 2) onLoadedData()

    // Choose the file here rather than in markup, so server and client HTML match.
    const wanted =
      videoSrcMobile && window.matchMedia("(max-width: 768px)").matches ? videoSrcMobile : videoSrc
    if (video.getAttribute("src") !== wanted) {
      video.src = wanted
      video.load()
    }

    // iOS Safari will not buffer video data until playback starts, so a
    // silent play-then-pause on mount kicks loading off.
    const p = video.play()
    if (p && typeof p.then === "function") p.then(() => video.pause()).catch(() => {})
    else video.pause()

    const onSeeked = () => {
      isSeeking = false
      if (pendingTime !== null) {
        const t = pendingTime
        pendingTime = null
        isSeeking = true
        video.currentTime = t
      }
    }
    video.addEventListener("seeked", onSeeked)

    function seekTo(t: number) {
      if (isSeeking) {
        pendingTime = t
        return
      }
      isSeeking = true
      video.currentTime = t
    }

    function engageLock() {
      if (locked) return
      locked = true
      lockedScrollY = window.scrollY
      const b = document.body.style
      b.position = "fixed"
      b.top = `-${lockedScrollY}px`
      b.left = "0"
      b.right = "0"
      b.width = "100%"
      b.overscrollBehavior = "none"
    }

    function releaseLock() {
      if (!locked) return
      locked = false
      const y = lockedScrollY
      const b = document.body.style
      b.position = ""
      b.top = ""
      b.left = ""
      b.right = ""
      b.width = ""
      b.overscrollBehavior = ""
      window.scrollTo(0, y)
    }

    function finishAndRelease() {
      targetProgress = 1
      currentProgress = 1
      hasStartedScrolling = true
      releaseLock()
    }

    /**
     * One entry point for wheel, touch and keys. Returns true when the input
     * was consumed (the caller should preventDefault), false when the page
     * should be allowed to scroll natively.
     */
    function handleDelta(deltaY: number): boolean {
      if (!locked) {
        // Unlocked: only re-lock when the visitor pushes up from the very top.
        if (deltaY < 0 && window.scrollY <= 0) {
          engageLock()
          overshoot = 0
        } else {
          return false
        }
      }

      if (deltaY > 0 && targetProgress >= 1) {
        overshoot += deltaY
        if (overshoot >= releaseDistance) {
          releaseLock()
          return false
        }
        return true
      }

      overshoot = 0
      targetProgress = clamp(targetProgress + deltaY / scrubDistance, 0, 1)
      if (targetProgress > 0.001) hasStartedScrolling = true
      return true
    }

    const onWheel = (e: WheelEvent) => {
      if (handleDelta(e.deltaY)) e.preventDefault()
    }
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0
    }
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY ?? touchStartY
      const deltaY = (touchStartY - y) * touchMultiplier
      touchStartY = y
      if (handleDelta(deltaY)) e.preventDefault()
    }

    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return
      if (e.altKey || e.ctrlKey || e.metaKey) return
      const step = scrubDistance * 0.12
      let delta = 0
      switch (e.key) {
        case "ArrowDown":
          delta = 80
          break
        case "ArrowUp":
          delta = -80
          break
        case "PageDown":
          delta = step
          break
        case "PageUp":
          delta = -step
          break
        case " ":
          delta = e.shiftKey ? -step : step
          break
        case "End":
          if (locked) {
            finishAndRelease()
            e.preventDefault()
          }
          return
        case "Home":
          if (!locked) return
          targetProgress = 0
          overshoot = 0
          e.preventDefault()
          return
        default:
          return
      }
      if (handleDelta(delta)) e.preventDefault()
    }

    // In-page links (Services, Contact...) must not be dead while locked.
    const onClick = (e: MouseEvent) => {
      if (!locked) return
      const anchor = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null
      if (!anchor) return
      const hash = anchor.hash
      if (!hash || hash === "#home" || anchor.pathname.replace(/\/$/, "") !== window.location.pathname.replace(/\/$/, "")) return
      finishAndRelease()
    }

    if (!reduceMotion) {
      engageLock()
      window.addEventListener("wheel", onWheel, { passive: false })
      window.addEventListener("touchstart", onTouchStart, { passive: true })
      window.addEventListener("touchmove", onTouchMove, { passive: false })
      window.addEventListener("keydown", onKeyDown)
      document.addEventListener("click", onClick, true)
    }

    let lastStage = 0

    function draw() {
      // Headline exit: the first line slides off to the right, the second to the
      // left (alternating for any further lines), fading as they go.
      {
        const t = clamp(currentProgress / 0.22, 0, 1)
        const eased = t * t * (3 - 2 * t)
        titleLineRefs.current.forEach((el, i) => {
          if (!el) return
          const dir = i % 2 === 0 ? 1 : -1
          el.style.transform = `translateX(${dir * eased * 60}vw)`
          el.style.opacity = String(1 - eased)
        })
      }
      if (hintRef.current) hintRef.current.style.opacity = hasStartedScrolling ? "0" : "1"
      if (taglineRef.current) {
        const t = clamp((currentProgress - 0.82) / 0.18, 0, 1)
        taglineRef.current.style.opacity = String(t)
        taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${0.97 + t * 0.03})`
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`
      }
      if (endRef.current) {
        const t = clamp((currentProgress - 0.9) / 0.1, 0, 1)
        endRef.current.style.opacity = String(t)
        endRef.current.style.transform = `translateY(${(1 - t) * 16}px)`
        endRef.current.style.pointerEvents = t > 0.6 ? "auto" : "none"
      }
      if (stagesRef.current.length) {
        let idx = 0
        stagesRef.current.forEach((st, i) => {
          if (currentProgress >= st.at) idx = i
        })
        if (idx !== lastStage) {
          lastStage = idx
          setStage(idx)
        }
      }
    }

    function frame() {
      currentProgress += (targetProgress - currentProgress) * 0.18
      if (duration > 0) seekTo(currentProgress * duration)
      draw()
      rafId = requestAnimationFrame(frame)
    }

    if (reduceMotion) {
      // No lock, no scrubbing: show the finished home with its call to action.
      targetProgress = currentProgress = 1
      hasStartedScrolling = true
      draw()
    } else {
      rafId = requestAnimationFrame(frame)
    }

    return () => {
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("durationchange", onLoadedData)
      video.removeEventListener("seeked", onSeeked)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("click", onClick, true)
      cancelAnimationFrame(rafId)
      releaseLock()
    }
  }, [scrubDistance, releaseDistance, touchMultiplier, videoSrc, videoSrcMobile])

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: poster ? `${COL_BG} url(${poster}) center / cover no-repeat` : COL_BG,
        ...style,
      }}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(28,24,20,0.55), rgba(28,24,20,0.1) 30%, rgba(28,24,20,0.25) 70%, rgba(28,24,20,0.7))",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 6%",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <style>{`@keyframes slvh-rise{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}@media(prefers-reduced-motion:reduce){.slvh-rise{animation:none!important}}`}</style>
        <h1
          style={{
            margin: 0,
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: "clamp(30px, 7vw, 96px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: COL_TEXT,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
          }}
        >
          {titleLines.map((line, i) => (
            // Outer span: driven by scroll (slides out). Inner span: the entrance.
            <span
              key={line}
              ref={(el) => {
                titleLineRefs.current[i] = el
              }}
              style={{ display: "block", willChange: "transform, opacity" }}
            >
              <span
                className="slvh-rise"
                style={{
                  display: "block",
                  animation: `slvh-rise 0.9s cubic-bezier(0.2, 0, 0, 1) ${0.3 + i * 0.18}s both`,
                }}
              >
                {line}
              </span>
              {/* Keeps a word break between lines for search engines and screen readers. */}
              {i < titleLines.length - 1 ? " " : null}
            </span>
          ))}
        </h1>
      </div>

      {tagline ? (
        <div
          ref={taglineRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8%",
            textAlign: "center",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: "clamp(20px, 3.4vw, 40px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: COL_TEXT,
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            {tagline}
          </p>
        </div>
      ) : null}

      <div
        ref={hintRef}
        style={{
          position: "absolute",
          left: "50%",
          bottom: stages && stages.length ? "clamp(170px, 27vh, 240px)" : "clamp(20px, 6vh, 48px)",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "rgba(255,250,243,0.8)",
          fontFamily: SANS,
          fontSize: "clamp(10px, 1.4vw, 12px)",
          fontWeight: 600,
          letterSpacing: "0.3em",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      >
        <style>{`@keyframes slvh-bounce{0%,100%{transform:translateY(0);opacity:.5}50%{transform:translateY(5px);opacity:1}}`}</style>
        <span>{scrollHint}</span>
        <ChevronDown size={18} strokeWidth={1.6} aria-hidden="true" style={{ animation: "slvh-bounce 1.6s ease-in-out infinite" }} />
      </div>

      {stages && stages.length ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "0 clamp(20px, 4vw, 56px) clamp(18px, 4vh, 40px)",
            pointerEvents: "none",
          }}
        >
          <div style={{ position: "relative", minHeight: "clamp(70px, 12vh, 110px)" }}>
            {stages.map((st, i) => (
              <div
                key={st.label}
                aria-hidden={i !== stage}
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  maxWidth: "min(560px, 90%)",
                  opacity: i === stage ? 1 : 0,
                  transform: i === stage ? "none" : "translateY(10px)",
                  transition: "opacity .5s ease, transform .5s ease",
                  fontFamily: SANS,
                  color: COL_TEXT,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.22em", opacity: 0.7 }}>
                  {String(i + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
                </div>
                <div style={{ marginTop: 6, fontSize: "clamp(22px, 3.4vw, 38px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", textShadow: "0 3px 22px rgba(0,0,0,.55)" }}>
                  {st.label}
                </div>
                <div style={{ marginTop: 8, fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.45, opacity: 0.85, textShadow: "0 2px 14px rgba(0,0,0,.6)" }}>
                  {st.caption}
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : null}

      {endContent ? (
        <div
          ref={endRef}
          className="slvh-end"
          style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
        >
          <style>{`.slvh-end{right:clamp(20px,4vw,56px);bottom:clamp(40px,9vh,96px)}@media(max-width:640px){.slvh-end{left:20px;right:20px;bottom:200px}}`}</style>
          {endContent}
        </div>
      ) : null}

      {signature ? (
        <span
          style={{
            position: "absolute",
            right: "clamp(12px, 2.5vw, 24px)",
            bottom: "clamp(10px, 2vw, 18px)",
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: "clamp(11px, 1.4vw, 13px)",
            color: "rgba(236,226,211,0.6)",
            zIndex: 2,
          }}
        >
          by{" "}
          <a href={signature.url} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
            {signature.name}
          </a>
        </span>
      ) : null}
    </div>
  )
}
