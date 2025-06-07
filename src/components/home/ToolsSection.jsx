import { SkillSection } from '@/components/SkillSection'

export function ToolsSection({ children, ...props }) {
  return (
    <SkillSection {...props}>
      <ul role="list" className="space-y-16">
        {children}
      </ul>
    </SkillSection>
  )
} 