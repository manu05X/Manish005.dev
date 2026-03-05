const skillIcons = {
  'Java':           '☕',
  'JavaScript':     '🟨',
  'TypeScript':     '🔷',
  'Python':         '🐍',
  'C++':            '⚙️',
  'Golang':         '🐹',
  'Spring Boot':    '🍃',
  'React.js':       '⚛️',
  'Next.js':        '▲',
  'Node.js':        '🟩',
  'Express.js':     '🚂',
  'REST APIs':      '🔗',
  'GraphQL':        '◈',
  'MongoDB':        '🍃',
  'MySQL':          '🐬',
  'PostgreSQL':     '🐘',
  'Redis':          '🔴',
  'AWS':            '☁️',
  'Docker':         '🐳',
  'Kubernetes':     '☸️',
  'Git & GitHub':   '🔀',
  'GitHub Copilot': '🤖',
  'Jira':           '📋',
  'Agile/Scrum':    '🔄',
  'CI/CD':          '🚀',
  'Microservices':  '🧩',
  'System Design':  '🏗️',
}

const SkillCategory = ({ title, skills, children }) => {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-teal-500 dark:text-teal-400">
        {title}
      </h3>
      {skills ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 hover:shadow-md hover:shadow-teal-500/10 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:border-teal-600 dark:hover:bg-teal-900/20 dark:hover:text-teal-300 dark:hover:shadow-teal-400/5"
            >
              <span className="text-base transition-transform duration-200 group-hover:scale-110">
                {skillIcons[skill] || '•'}
              </span>
              <span>{skill}</span>
            </div>
          ))}
        </div>
      ) : (
        children
      )}
    </div>
  )
}

export default SkillCategory
