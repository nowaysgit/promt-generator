import type { ProcessTexts, PresetCollection, Rule, ProcessType } from '~/types'

export const usePromptGenerator = () => {
  // Тексты алгоритмов
  const processTexts: ProcessTexts = {
    analysis: `Читай .progress → выбирай задачу из pending
Используй .progress.helper для контекста
Выполняй задачу, пройдись по всем директориям и поддиректориям в рамках задачи:
Перенеси задачу из pending в completed
Добавь найденные проблемы в problems.
Дополни .progress.helper новыми данными
Повторяй пока pending не опустеет`,
    preparation: `Проверить существование \`.progress\`:
Если файл отсутствует — сообщить об ошибке и завершить работу.
Обработать проблемы: 
{
  "current_step": 0,
  "completed": [],
  "pending": [],  // Сюда поместить результат
  "problems": []  // Очистить после обработки
}

Использовать \`.progress.helper\` для:
Объединения дублирующихся проблем.
Уточнения формулировок (с акцентом на избыточные файлы/сервисы/методы).
Правила сортировки: проблемы, связанные с дублированием файлов → избыточные сервисы → дубли методов.
Учитывать зависимости между модулями (сверять с \`architectural_links\` в хелпере).`,
    fixing: `1. Для каждого нового запроса:
   1.1 Считай текущее состояние из \`.progress\` и \`.progress.helper\`
   1.2 Извлеки следующую проблему из раздела \`pending\`
   1.3 Внеси необходимые исправления в код проекта
   1.4 Обнови \`.progress\`:
        {
          "current_step": [номер текущего шага + 1],
          "completed": [..., "Текущая исправленная проблема"],
          "pending": [список оставшихся проблем]
        }
   1.5 Актуализируй \`.progress.helper\`, дополни/обнови с учетом изменений, если появилась новая информация которой еще нет в файле добавь ее.
   1.6 Повторяй шаги 1.1-1.5 пока в \`pending\` остаются проблемы`,
    custom: ''
  }



  // Типы для объекта processTypes
  const processTypes = {
    analysis: 'Анализ',
    preparation: 'Подготовка',
    fixing: 'Исправление',
    custom: 'Кастомный'
  }

  // Генерация промта из пресета
  const generatePrompt = (preset: any): string => {
    if (!preset) return ''
    
    const goal = preset.goal || ''
    const processType = preset.processType || 'analysis'
    const customProcess = preset.customProcess || ''
    const rules = preset.rules || []
    const progressConfig = preset.progressConfig || ''
    const progressHelperConfig = preset.progressHelperConfig || ''
    const progressHelperRules = preset.progressHelperRules || ''
    const finalizationConfig = preset.finalizationConfig || ''
    let processText = ''
    
    if (processType === 'custom') {
      processText = customProcess
    } else if (processTexts[processType as keyof ProcessTexts]) {
      processText = processTexts[processType as keyof ProcessTexts]
    }

    // Сборка промта с улучшенным форматированием
    const sections: string[] = []

    // 1. Заголовок и цель
    sections.push(`# ЗАДАЧА: ${processTypes[processType as keyof typeof processTypes].toUpperCase()}`)
    sections.push(`## ЦЕЛЬ\n${goal}`)

    // 3. Алгоритм выполнения
    if (processText.trim()) {
      sections.push(`## АЛГОРИТМ\n${processText}`)
    }

    // 2. Инициализация для анализа
    if (processType === 'analysis') {
      sections.push(`## ИНИЦИАЛИЗАЦИЯ\n### Если отсутствует .progress, создай файл:\n\`\`\`json\n${progressConfig}\n\`\`\``)
      sections.push(`### Создай/обнови .progress.helper:\n\`\`\`json\n${progressHelperConfig}\n\`\`\``)
    }

    // 4. Структуры файлов и правила
    if (processType !== 'analysis') {
      sections.push(`## СТРУКТУРА .progress.helper (НЕ ИЗМЕНЯТЬ СХЕМУ)\n\`\`\`json\n${progressHelperConfig}\n\`\`\``)
    }
    if (progressHelperRules.trim()) {
      sections.push(`## ПРАВИЛА ДЛЯ .progress.helper\n${progressHelperRules}`)
    }

    // 5. Финализация
    if (finalizationConfig && finalizationConfig.trim()) {
      sections.push(`## ФИНАЛИЗАЦИЯ\n${finalizationConfig}`)
    }

    // 6. Строгие правила
    const forbiddenRules: string[] = []
    const allowedRules: string[] = []
    
    if (rules && Array.isArray(rules)) {
      rules.forEach(rule => {
        if (rule.checked) {
          const ruleText = `${rule.important ? '⚠️ КРИТИЧНО: ' : ''}${rule.text}`
          if (rule.type === 'forbidden') {
            forbiddenRules.push(ruleText)
          } else {
            allowedRules.push(ruleText)
          }
        }
      })
    }

    if (forbiddenRules.length > 0) {
      sections.push(`## ❌ ЗАПРЕЩЕНО\n${forbiddenRules.map(rule => `- ${rule}`).join('\n')}`)
    }
    
    if (allowedRules.length > 0) {
      sections.push(`## ✅ РАЗРЕШЕНО\n${allowedRules.map(rule => `- ${rule}`).join('\n')}`)
    }

    return sections.join('\n\n')
  }

  return {
    processTexts,
    processTypes,
    generatePrompt
  }
} 