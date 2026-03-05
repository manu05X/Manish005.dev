import { SkillSection } from '@/components/SkillSection'

export function ToolsSection({ children, ...props }) {
  return (
    <SkillSection {...props}>
      <div className="space-y-2">
        {children}
      </div>
    </SkillSection>
  )
}
