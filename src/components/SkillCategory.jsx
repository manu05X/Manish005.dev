import { motion } from 'framer-motion'

// Skill level 0–100
const skillData = {
  'Java':           { level: 92, color: '#f97316' },
  'JavaScript':     { level: 90, color: '#eab308' },
  'TypeScript':     { level: 85, color: '#3b82f6' },
  'Python':         { level: 78, color: '#22c55e' },
  'C++':            { level: 72, color: '#6366f1' },
  'Golang':         { level: 65, color: '#06b6d4' },
  'Spring Boot':    { level: 90, color: '#6EE7B7' },
  'React.js':       { level: 88, color: '#38bdf8' },
  'Next.js':        { level: 85, color: '#818CF8' },
  'Node.js':        { level: 82, color: '#4ade80' },
  'Express.js':     { level: 80, color: '#94a3b8' },
  'REST APIs':      { level: 92, color: '#6EE7B7' },
  'GraphQL':        { level: 70, color: '#e879f9' },
  'MongoDB':        { level: 80, color: '#4ade80' },
  'MySQL':          { level: 82, color: '#38bdf8' },
  'PostgreSQL':     { level: 75, color: '#818CF8' },
  'Redis':          { level: 72, color: '#f87171' },
  'AWS':            { level: 78, color: '#fb923c' },
  'Docker':         { level: 80, color: '#38bdf8' },
  'Kubernetes':     { level: 70, color: '#818CF8' },
  'Git & GitHub':   { level: 92, color: '#6EE7B7' },
  'GitHub Copilot': { level: 88, color: '#818CF8' },
  'Jira':           { level: 85, color: '#3b82f6' },
  'Agile/Scrum':    { level: 88, color: '#6EE7B7' },
  'CI/CD':          { level: 80, color: '#a78bfa' },
  'Microservices':  { level: 85, color: '#818CF8' },
  'System Design':  { level: 82, color: '#6EE7B7' },
}

function SkillBar({ skill }) {
  const data = skillData[skill] || { level: 75, color: '#6EE7B7' }
  return (
    <div className="group">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{skill}</span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500 opacity-0 transition-opacity group-hover:opacity-100">
          {data.level}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-700/50">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: data.color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${data.level}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </div>
    </div>
  )
}

const SkillCategory = ({ title, skills }) => {
  return (
    <div className="mb-7">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest"
        style={{ color: '#6EE7B7' }}>
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {skills?.map((skill) => (
          <SkillBar key={skill} skill={skill} />
        ))}
      </div>
    </div>
  )
}

export default SkillCategory
