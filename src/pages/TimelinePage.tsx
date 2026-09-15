/**
 * TimelinePage —— 人生版本历史 /timeline
 * 数据来自 src/data/timeline.ts
 */

import PageHeader from '../components/PageHeader'
import Timeline from '../components/Timeline'
import releases from '../data/timeline'

export default function TimelinePage() {
  return (
    <>
      <PageHeader
        label="04 / Timeline"
        title="版本历史"
        description="把人生当成一个长期维护的项目：每一次转折都算一次发版。"
        aside={
          <div className="text-right">
            <p className="font-mono text-3xl text-ink">{releases.length}</p>
            <p className="mt-1 font-mono text-xs text-ink-faint">tags</p>
          </div>
        }
      />
      <Timeline showHeader={false} />
    </>
  )
}
