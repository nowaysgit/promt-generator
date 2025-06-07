export interface Rule {
  id: string
  text: string
  type: 'forbidden' | 'allowed'
  important: boolean
  checked: boolean
}

export interface Preset {
  name: string
  goal: string
  processType: ProcessType
  progressConfig: string
  progressHelperConfig: string
  progressHelperRules: string
  finalizationConfig: string
  customProcess: string
  rules: Rule[]
}

export type ProcessType = 'analysis' | 'preparation' | 'fixing' | 'custom'

export interface PresetCollection {
  [key: string]: Preset
}

export type ProcessTexts = {
  [key in ProcessType]: string
}

export interface ProgressConfig {
  current_step: number
  completed: string[]
  pending: string[]
  problems: string[]
}

export interface ProgressHelper {
  project_structure: {
    directories: DirectoryNode
  }
  key_services: ServiceInfo[]
  architectural_links: ArchitecturalLink[]
  file_registry: {
    potential_duplicates: Record<string, string[]>
    removed_duplicates?: string[]
  }
  module_hierarchy: Record<string, ModuleInfo>
}

export interface DirectoryNode {
  path: string
  type: 'directory' | 'file'
  children?: DirectoryNode[]
  description?: string
  exports?: string[]
}

export interface ServiceInfo {
  name: string
  path: string
  description: string
  used_in: string[]
}

export interface ArchitecturalLink {
  source: string
  target: string
  direction: string
  description: string
}

export interface ModuleInfo {
  path: string
  components: string[]
  services: string[]
} 