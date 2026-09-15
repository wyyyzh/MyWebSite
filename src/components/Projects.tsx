import { useState } from 'react'
import projects, { type Project } from '../data/projects'
import Reveal from './Reveal'

const VISIBILITY_STYLE: Record<Project['visibility'], string> = {
  公开: 'border-accent/30 bg-accent-soft text-accent',
  私密: 'border-line bg-paper-deep text-ink-faint',
  进行中: 'border-clay/30 bg-clay-soft text-clay',
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card card-hover flex h-full flex-col p-6">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className={`chip ${VISIBILITY_STYLE[project.visibility]}`}>{project.visibility}</span>
        <span className="font-mono text-xs text-ink-faint">{project.year}</span>
      </div>

      <h3 className="mb-2.5 text-xl">{project.title}</h3>
      <p className="mb-4 text-[0.95rem] leading-relaxed text-ink-soft">{project.summary}</p>

      <ul className="mb-5 space-y-1.5">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-sm text-ink-soft">
            <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-line-soft pt-4">
        {project.tags.map((t) => (
          <span key={t} className="font-mono text-[11px] text-ink-faint">
            #{t}
          </span>
        ))}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            className="focus-ring ml-auto font-mono text-xs text-accent underline-offset-4 hover:underline"
          >
            查看 →
          </a>
        )}
      </div>
    </article>
  )
}

export function Projects() {
  const [showAll, setShowAll] = useState(false)
  const featured = projects.filter((p) => p.featured)
  const list = showAll ? projects : featured

  return (
    <section id="projects" className="py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="section-label mb-1.5">Projects</p>
              <h2 className="text-2xl sm:text-3xl">
                {projects.length} 个项目精华
                <span className="ml-2 font-mono text-base text-ink-faint">({projects.length})</span>
              </h2>
            </div>
            {/* 精选数 = 总数时，按钮点了没变化，直接不显示 */}
            {projects.length > featured.length && (
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="focus-ring font-mono text-sm text-ink-soft underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {showAll ? '收起 ←' : '查看全部项目 →'}
              </button>
            )}
          </div>
        </Reveal>

        <div className={`grid gap-5 ${list.length === 1 ? 'sm:max-w-2xl' : 'sm:grid-cols-2'}`}>
          {list.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i, 4) * 70}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
