import type { PresetCollection, Preset } from '~/types'

export const usePresets = () => {
  const STORAGE_KEY = 'prompt-generator-presets'
  const defaultPresets = ref<PresetCollection>({})
  const currentPresets = ref<PresetCollection>({})

  // Загрузка дефолтных пресетов из JSON файла
  const loadDefaultPresets = async (): Promise<PresetCollection> => {
    try {
      const response = await $fetch<PresetCollection>('/presets.json')
      return response
    } catch (error) {
      console.error('Ошибка загрузки дефолтных пресетов:', error)
      return {}
    }
  }

  // Загрузка пресетов из localStorage или дефолтных
  const loadPresets = async (): Promise<PresetCollection> => {
    // Загружаем дефолтные пресеты
    const defaults = await loadDefaultPresets()
    defaultPresets.value = defaults

    // Проверяем localStorage
    if (process.client) {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          currentPresets.value = parsed
          return parsed
        } catch (error) {
          console.error('Ошибка парсинга пресетов из localStorage:', error)
        }
      }
    }

    // Возвращаем дефолтные если нет сохраненных
    currentPresets.value = defaults
    return defaults
  }

  // Сохранение пресетов в localStorage
  const savePresets = (presets: PresetCollection) => {
    if (process.client) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(presets, null, 2))
        currentPresets.value = presets
      } catch (error) {
        console.error('Ошибка сохранения пресетов в localStorage:', error)
      }
    }
  }

  // Сохранение отдельного пресета
  const savePreset = (key: string, preset: Preset) => {
    const updated = { ...currentPresets.value, [key]: preset }
    savePresets(updated)
  }

  // Экспорт пресетов в JSON
  const exportPresets = (): string => {
    return JSON.stringify(currentPresets.value, null, 2)
  }

  // Импорт пресетов из JSON
  const importPresets = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString)
      savePresets(parsed)
      return true
    } catch (error) {
      console.error('Ошибка импорта пресетов:', error)
      return false
    }
  }

  // Сброс к дефолтным настройкам
  const resetToDefaults = () => {
    if (process.client) {
      localStorage.removeItem(STORAGE_KEY)
      currentPresets.value = { ...defaultPresets.value }
    }
  }

  // Скачивание файла
  const downloadPresets = () => {
    if (process.client) {
      const dataStr = exportPresets()
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'prompt-generator-presets.json'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
  }

  return {
    defaultPresets: readonly(defaultPresets),
    currentPresets: readonly(currentPresets),
    loadPresets,
    savePresets,
    savePreset,
    exportPresets,
    importPresets,
    resetToDefaults,
    downloadPresets
  }
} 