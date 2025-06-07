<template>
  <!-- Full Screen App Container -->
  <div class="h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 relative overflow-hidden">
    
    <!-- Modern Background Pattern -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-violet-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-cyan-100/20 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-emerald-50/10 to-teal-50/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Compact Header -->
    <header class="bg-white/60 backdrop-blur-2xl border-b border-gray-200/30 px-6 py-3">
      <div class="flex items-center justify-between">
        
        <!-- Logo & Title -->
        <div class="flex items-center space-x-4">
          <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">Генератор промтов</h1>
            <p class="text-sm text-gray-600 font-medium">Анализ архитектуры кода</p>
          </div>
        </div>

        <!-- Quick Actions Toolbar -->
        <div class="flex items-center space-x-2">
          <button 
            @click="saveCurrentPreset" 
            title="Сохранить пресет"
            class="group flex items-center space-x-2 px-3 py-2 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span class="text-xs font-medium">Сохранить</span>
          </button>
          
          <button 
            @click="downloadPresets" 
            title="Экспортировать пресеты"
            class="group flex items-center space-x-2 px-3 py-2 bg-gradient-to-br from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="text-xs font-medium">Экспорт</span>
          </button>
          
          <button 
            @click="triggerFileUpload" 
            title="Импортировать пресеты"
            class="group flex items-center space-x-2 px-3 py-2 bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
            </svg>
            <span class="text-xs font-medium">Импорт</span>
          </button>
          
          <button 
            @click="resetPresets" 
            title="Сбросить настройки"
            class="group flex items-center space-x-2 px-3 py-2 bg-gradient-to-br from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 rounded-xl text-white transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span class="text-xs font-medium">Сброс</span>
          </button>

          <input type="file" ref="fileInput" @change="uploadPresets" accept=".json" class="hidden" />
        </div>
      </div>
    </header>

    <!-- Main Container - Adjusted Column Layout -->
    <main class="p-4 h-[calc(100vh-80px)] relative z-10">
      <div class="grid grid-cols-[1.3fr_2fr_1.3fr_1.4fr_1.4fr] gap-4 h-full min-h-0">
 
        <!-- Column 1: Preset Selector, Goal & Finalization -->
        <div class="space-y-3 h-full flex flex-col min-h-0">

          <!-- Preset Selector -->
          <div class="bg-white/80 backdrop-blur-xl rounded-xl p-3 border border-gray-200/40 shadow-lg flex-shrink-0">
            <h3 class="text-base font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <div class="w-5 h-5 bg-gradient-to-br from-violet-400 to-purple-500 rounded-lg flex items-center justify-center">
                <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span>Пресет</span>
            </h3>
            
            <div class="relative">
              <select 
                v-model="selectedPresetKey" 
                @change="onPresetChange"
                class="appearance-none w-full bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-lg px-3 py-2 pr-8 text-xs font-semibold text-gray-800 hover:border-indigo-300 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100/50 transition-all duration-300 shadow-sm"
              >
                <option value="" disabled>Выберите пресет</option>
                <option v-for="(preset, key) in presets" :key="key" :value="key">
                  {{ preset.name || key }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Goal Configuration (flexible height) -->
          <div class="bg-white/80 backdrop-blur-xl rounded-xl p-3 border border-gray-200/40 shadow-lg flex-1 min-h-0">
            <h3 class="text-base font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <div class="w-5 h-5 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center">
                <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <span>Цель</span>
            </h3>
            
            <textarea
              v-model="currentPreset.goal"
              placeholder="Опишите цель анализа..."
              class="w-full h-[calc(100%-3rem)] px-2 py-2 bg-white/60 border border-gray-200/60 rounded-lg focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100/60 resize-none transition-all duration-300 text-gray-800 placeholder-gray-500 text-xs shadow-sm"
            ></textarea>
          </div>

          <!-- Finalization (fixed height) -->
          <div class="h-fit bg-white/80 backdrop-blur-xl rounded-xl p-3 border border-gray-200/40 shadow-lg h-48 flex-shrink-0">
            <h3 class="text-base font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <div class="w-5 h-5 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <span>Финализация</span>
            </h3>
            
            <textarea
              v-model="currentPreset.finalizationConfig"
              placeholder="Настройки завершения процесса..."
              rows="15"
              class="w-full px-2 py-2 bg-white/60 border border-gray-200/60 rounded-lg focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100/60 resize-none transition-all duration-300 text-xs shadow-sm"
            ></textarea>
          </div>
        </div>

        <!-- Column 2: Process Type & Progress Configuration (Expanded) -->
        <div class="space-y-4 h-full min-h-0 flex flex-col">

          <!-- Process Type (fixed height) -->
          <div class="bg-white/80 backdrop-blur-xl rounded-xl p-3 border border-gray-200/40 shadow-lg h-fit flex-shrink-0">
            <h3 class="text-base font-bold text-gray-900 mb-3 flex items-center space-x-2">
              <div class="w-5 h-5 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span>Тип процесса</span>
            </h3>
            
            <div class="grid grid-cols-2 gap-2 mb-3">
              <label 
                v-for="(label, type) in processTypes" 
                :key="type"
                class="flex items-center justify-center p-2 border-2 rounded-lg cursor-pointer transition-colors duration-200 h-12"
                :class="{
                  'border-indigo-400 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-md': currentPreset.processType === type,
                  'border-gray-200/60 bg-white/60 hover:border-gray-300 hover:bg-white/80': currentPreset.processType !== type
                }"
              >
                <input
                  type="radio"
                  :value="type"
                  v-model="currentPreset.processType"
                  class="sr-only"
                />
                <div class="text-center">
                  <span class="text-xs font-medium text-gray-800">{{ label }}</span>
                  <div 
                    v-if="currentPreset.processType === type" 
                    class="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto mt-1"
                  ></div>
                </div>
              </label>
            </div>
            
            <!-- Process Preview -->
            <div class="bg-gradient-to-br from-gray-50/80 to-slate-50/80 border border-gray-200/60 rounded-lg p-3" v-if="currentPreset.processType !== 'custom'">
              <div class="flex items-center space-x-2 mb-2">
                <svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span class="text-xs font-semibold text-gray-700">Предпросмотр процесса</span>
              </div>
              <div class="text-xs text-gray-600 whitespace-pre-wrap font-mono leading-relaxed bg-white/50 rounded-md p-2 border border-gray-200/40 overflow-y-auto h-40">
                <template v-if="currentPreset.processType === 'custom'">
                  {{ currentPreset.customProcess || 'Введите описание кастомного процесса...' }}
                </template>
                <template v-else>
                  {{ processTexts[currentPreset.processType] || '' }}
                </template>
              </div>
            </div>
            
            <!-- Custom Process -->
            <div 
              v-if="currentPreset.processType === 'custom'"
              class="bg-gradient-to-br from-purple-50/80 to-pink-50/80 border border-purple-200/60 rounded-lg p-3 pb-[6px]"
            >
              <label class="flex items-center space-x-2 mb-2">
                <svg class="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span class="text-xs font-semibold text-gray-800">Кастомный процесс</span>
              </label>
              <textarea
                v-model="currentPreset.customProcess"
                placeholder="Опишите кастомный процесс обработки..."
                class="w-full h-40 px-3 py-2 font-mono bg-white/80 border border-purple-200/40 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-100/60 resize-none transition-all duration-300 text-xs shadow-sm"
              ></textarea>
            </div>
          </div>

          <!-- Progress Configuration (takes remaining space) -->
          <div class="bg-white/80 backdrop-blur-xl rounded-xl p-3 border border-gray-200/40 shadow-lg flex-1 min-h-0">
            <h3 class="text-base font-bold h-fit text-gray-900 mb-3 flex items-center space-x-2">
              <div class="w-5 h-5 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span>Конфигурация прогресса</span>
            </h3>
            
            <div class="h-full flex flex-col gap-3 min-h-0">
              <!-- .progress файл - 40% высоты -->
              <div class="flex flex-col min-h-0">
                <label class="text-xs font-semibold text-gray-800 mb-1 flex items-center space-x-1 flex-shrink-0">
                  <code class="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">.progress</code>
                  <span class="text-gray-600">Структура файла прогресса</span>
                </label>
                <textarea
                  v-model="currentPreset.progressConfig"
                  placeholder='{"current_step": 0, "completed": [], "pending": [], "problems": []}'
                  rows="10"
                  class="w-full min-h-0 px-2 py-2 bg-white/60 border border-gray-200/60 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-100/60 resize-none transition-all duration-300 font-mono text-xs shadow-sm"
                ></textarea>
              </div>
              
              <!-- .progress.helper файл - 40% высоты -->
              <div class="flex h-[calc(100%-380px)] flex-col min-h-0">
                <label class="text-xs font-semibold text-gray-800 mb-1 flex items-center space-x-1 flex-shrink-0">
                  <code class="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">.progress.helper</code>
                  <span class="text-gray-600">Структура файла помощника</span>
                </label>
                <textarea
                  v-model="currentPreset.progressHelperConfig"
                  placeholder='{"project_structure": {...}, "key_services": [...], "architectural_links": [...]}'
                  class="w-full h-full min-h-20 px-2 py-2 bg-white/60 border border-gray-200/60 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-100/60 resize-none transition-all duration-300 font-mono text-xs shadow-sm"
                ></textarea>
              </div>
              
              <!-- Правила для .progress.helper - 20% высоты -->
              <div class="flex flex-col min-h-0">
                <label class="text-xs font-semibold text-gray-800 mb-1 flex items-center space-x-1 flex-shrink-0">
                  <svg class="w-3 h-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Правила для .progress.helper</span>
                </label>
                <textarea
                  v-model="currentPreset.progressHelperRules"
                  placeholder="Правила обновления файла помощника..."
                  rows="5"
                  class="w-full min-h-0 px-2 py-2 bg-white/60 border border-gray-200/60 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-100/60 resize-none transition-all duration-300 font-mono text-xs shadow-sm"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 3: Rules (Improved) -->
        <div class="h-full min-h-0">
          <div class="bg-white/80 backdrop-blur-xl rounded-xl p-3 border border-gray-200/40 shadow-lg h-full flex flex-col min-h-0">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-base font-bold text-gray-900 flex items-center space-x-2">
                <div class="w-5 h-5 bg-gradient-to-br from-purple-400 to-violet-500 rounded-lg flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span>Правила</span>
              </h3>
              
              <button
                @click="addNewRule"
                class="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-xs font-semibold rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Добавить</span>
              </button>
            </div>
            
            <div ref="rulesContainer" class="flex-1 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1 min-h-0">
              <!-- Improved RuleItem inline -->
              <transition-group name="rule" tag="div" class="space-y-3">
                <div 
                  v-for="rule in currentPreset.rules"
                  :key="rule.id"
                  class="bg-white/70 border border-gray-200/60 rounded-xl p-3 transition-all hover:shadow-md hover:bg-white/90 hover:border-gray-300/60 rule-item"
                  :class="{ 'opacity-60': !rule.checked }"
                >
                <!-- Main content: prioritize text input -->
                <div class="mb-3">
                  <textarea
                    :value="rule.text"
                    @input="updateRule({ ...rule, text: ($event.target as HTMLTextAreaElement).value })"
                    placeholder="Описание правила..."
                    rows="2"
                    class="w-full px-3 py-2 border border-gray-200/60 rounded-lg text-xs resize-none transition-all duration-300 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100/60 bg-white/90 shadow-sm"
                    :class="{ 'opacity-70': !rule.checked }"
                  ></textarea>
                </div>
                
                <!-- Controls row -->
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center space-x-2">
                    <!-- Enable/Disable - Modern Toggle Switch -->
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        :checked="rule.checked"
                        @change="updateRule({ ...rule, checked: ($event.target as HTMLInputElement).checked })"
                        class="sr-only peer"
                      />
                      <div class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-600 shadow-sm"></div>
                      <span class="ml-2 text-xs font-medium text-gray-700">Активно</span>
                    </label>
                    
                    <!-- Type selector - Modern styled -->
                    <div class="relative">
                      <select
                        :value="rule.type"
                        @change="updateRule({ ...rule, type: ($event.target as HTMLSelectElement).value as 'allowed' | 'forbidden' })"
                        class="appearance-none text-xs font-medium border border-gray-200/60 rounded-lg px-3 py-1.5 pr-8 bg-white/90 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100/60 transition-all duration-300 shadow-sm cursor-pointer"
                        :class="{
                          'text-emerald-700 bg-emerald-50/80 border-emerald-200': rule.type === 'allowed',
                          'text-red-700 bg-red-50/80 border-red-200': rule.type === 'forbidden'
                        }"
                      >
                        <option value="allowed">✓ Разрешено</option>
                        <option value="forbidden">✗ Запрещено</option>
                      </select>
                      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    
                    <!-- Important toggle - Modern Badge Style -->
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        :checked="rule.important"
                        @change="updateRule({ ...rule, important: ($event.target as HTMLInputElement).checked })"
                        class="sr-only peer"
                      />
                      <div class="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border transition-all duration-300 peer-checked:bg-gradient-to-r peer-checked:from-amber-50 peer-checked:to-orange-50 peer-checked:border-amber-300 peer-checked:text-amber-800 peer-checked:shadow-sm border-gray-200 text-gray-500 bg-gray-50/50">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <span class="text-xs font-medium">Важное</span>
                      </div>
                    </label>
                  </div>
                  
                  <!-- Delete button - Modern styled -->
                  <button
                    @click="deleteRule(rule.id)"
                    class="group flex items-center justify-center w-8 h-8 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-300 rounded-lg border border-transparent hover:border-red-200 hover:shadow-sm"
                  >
                    <svg class="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              </transition-group>
              
              <div v-if="currentPreset.rules.length === 0" class="text-center py-8 text-gray-500">
                <svg class="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-xs font-medium mb-1">Нет правил</p>
                <p class="text-xs">Создайте правила</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Column 4 & 5: Generated Prompt Panel (Narrower) -->
        <div class="col-span-2 h-full min-h-0">
          <div class="bg-white/80 backdrop-blur-xl rounded-xl p-3 border border-gray-200/40 shadow-lg h-full flex flex-col min-h-0">
            
            <!-- Header -->
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-base font-bold text-gray-900 flex items-center space-x-2">
                <div class="w-5 h-5 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
                  <svg class="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span>Готовый промт</span>
              </h3>
              
              <button
                @click="copyToClipboard"
                class="flex items-center space-x-1 px-3 py-1 text-white text-xs font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                :class="showCopyNotification 
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600' 
                  : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700'"
              >
                <svg v-if="!showCopyNotification" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ showCopyNotification ? 'Скопировано!' : 'Копировать' }}</span>
              </button>
            </div>
            
            <!-- Prompt Content -->
            <div class="flex-1 bg-gray-50/80 border border-gray-200/60 rounded-lg p-3 font-sans text-sm text-gray-800 whitespace-pre-wrap overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 leading-relaxed"
                 v-html="formatPrompt(generatedPrompt)">
            </div>
            

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import type { Preset, Rule, PresetCollection } from '~/types'
import { usePromptGenerator } from '~/composables/usePromptGenerator'
import { usePresets } from '~/composables/usePresets'

const SELECTED_PRESET_KEY = 'selectedPresetKey'

// Removed tab navigation - showing all sections on one page

// Composables
const { processTypes, processTexts, generatePrompt } = usePromptGenerator()
const { 
  currentPresets: presets, 
  loadPresets, 
  savePresets: savePresetsToStorage, 
  downloadPresets, 
  importPresets, 
  resetToDefaults 
} = usePresets()

// Reactive state
const selectedPresetKey = ref<string>('')
const currentPreset = ref<Preset>({
  name: '',
  goal: '',
  processType: 'analysis',
  progressConfig: '',
  progressHelperConfig: '',
  progressHelperRules: '',
  finalizationConfig: '',
  customProcess: '',
  rules: []
})

const fileInput = ref<HTMLInputElement>()
const rulesContainer = ref<HTMLElement>()
const showCopyNotification = ref(false)

// Computed
const generatedPrompt = computed(() => {
  return generatePrompt(currentPreset.value)
})

// Methods
const loadSelectedPreset = () => {
  if (selectedPresetKey.value && presets.value[selectedPresetKey.value]) {
    const preset = presets.value[selectedPresetKey.value]
    currentPreset.value = {
      name: preset.name,
      goal: preset.goal,
      processType: preset.processType,
      progressConfig: preset.progressConfig,
      progressHelperConfig: preset.progressHelperConfig,
      progressHelperRules: preset.progressHelperRules,
      finalizationConfig: preset.finalizationConfig,
      customProcess: preset.customProcess,
      rules: [...preset.rules]
    }
  }
}

const onPresetChange = () => {
  loadSelectedPreset()
  // Сохраняем выбранный пресет в localStorage
  if (process.client) {
    localStorage.setItem(SELECTED_PRESET_KEY, selectedPresetKey.value)
  }
}

const saveCurrentPreset = () => {
  if (selectedPresetKey.value) {
    const presetToSave: Preset = {
      name: currentPreset.value.name,
      goal: currentPreset.value.goal,
      processType: currentPreset.value.processType,
      progressConfig: currentPreset.value.progressConfig,
      progressHelperConfig: currentPreset.value.progressHelperConfig,
      progressHelperRules: currentPreset.value.progressHelperRules,
      finalizationConfig: currentPreset.value.finalizationConfig,
      customProcess: currentPreset.value.customProcess,
      rules: currentPreset.value.rules.map(rule => ({ ...rule }))
    }
    const updatedPresets: PresetCollection = {}
    Object.keys(presets.value).forEach(key => {
      const preset = presets.value[key]
      updatedPresets[key] = {
        name: preset.name,
        goal: preset.goal,
        processType: preset.processType,
        progressConfig: preset.progressConfig,
        progressHelperConfig: preset.progressHelperConfig,
        progressHelperRules: preset.progressHelperRules,
        finalizationConfig: preset.finalizationConfig,
        customProcess: preset.customProcess,
        rules: [...preset.rules]
      }
    })
    updatedPresets[selectedPresetKey.value] = presetToSave
    savePresetsToStorage(updatedPresets)
  }
}

const addNewRule = async () => {
  const newRule: Rule = {
    id: `rule${Date.now()}`,
    text: '',
    type: 'allowed',
    important: false,
    checked: true
  }
  currentPreset.value.rules.push(newRule)
  
  // Скролл вниз и анимация после добавления
  await nextTick()
  if (rulesContainer.value) {
    const newRuleElement = rulesContainer.value.querySelector('.rule-item:last-child') as HTMLElement
    if (newRuleElement) {
      // Анимация появления
      newRuleElement.style.transform = 'scale(0.8)'
      newRuleElement.style.opacity = '0'
      
      // Скролл к новому элементу
      rulesContainer.value.scrollTo({
        top: rulesContainer.value.scrollHeight,
        behavior: 'smooth'
      })
      
      // Анимация появления
      setTimeout(() => {
        newRuleElement.style.transition = 'all 0.3s ease-out'
        newRuleElement.style.transform = 'scale(1)'
        newRuleElement.style.opacity = '1'
      }, 100)
    }
  }
}

const updateRule = (updatedRule: Rule) => {
  const index = currentPreset.value.rules.findIndex(r => r.id === updatedRule.id)
  if (index !== -1) {
    currentPreset.value.rules[index] = updatedRule
  }
}

const deleteRule = (ruleId: string) => {
  currentPreset.value.rules = currentPreset.value.rules.filter(r => r.id !== ruleId)
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedPrompt.value)
    showCopyNotification.value = true
    setTimeout(() => {
      showCopyNotification.value = false
    }, 2000)
  } catch (err) {
    console.error('Ошибка копирования:', err)
  }
}

const formatPrompt = (prompt: string) => {
  const lines = prompt.split('\n')
  const formattedLines = lines.map(line => {
    if (line.startsWith('#')) {
      return line.replace(/^(#{1,6})\s(.+)$/gm, (match, hashes, text) => {
      const level = hashes.length
      const classes = [
        'text-2xl font-bold text-slate-900',
        'text-xl font-bold text-slate-800', 
        'text-lg font-semibold text-slate-800',
        'text-base font-semibold text-slate-700',
        'text-sm font-semibold text-slate-700',
        'text-sm font-medium text-slate-600'
      ]
      return `<h${level} class="${classes[level-1] || classes[5]}">${text}</h${level}>`
    })
    }
    return line
  })
  return formattedLines.join('<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="text-slate-700">$1</em>')
}

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const uploadPresets = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const jsonString = e.target?.result as string
      if (jsonString && importPresets(jsonString)) {
        // После загрузки выбираем первый доступный пресет
        const firstPresetKey = Object.keys(presets.value)[0]
        if (firstPresetKey) {
          selectedPresetKey.value = firstPresetKey
          loadSelectedPreset()
          if (process.client) {
            localStorage.setItem(SELECTED_PRESET_KEY, selectedPresetKey.value)
          }
        }
      }
    }
    reader.readAsText(file)
  }
}

const resetPresets = async () => {
  if (confirm('Вы уверены, что хотите сбросить все настройки? Это действие нельзя отменить.')) {
    resetToDefaults()
    await loadPresets()
    // После сброса выбираем первый доступный пресет
    const firstPresetKey = Object.keys(presets.value)[0]
    if (firstPresetKey) {
      selectedPresetKey.value = firstPresetKey
      loadSelectedPreset()
      if (process.client) {
        localStorage.setItem(SELECTED_PRESET_KEY, selectedPresetKey.value)
      }
    }
  }
}

// Page title
useHead({
  title: 'Генератор промтов - Анализ архитектуры кода',
})

// Lifecycle
onMounted(async () => {
  await loadPresets()
  
  // Восстанавливаем выбранный пресет из localStorage
  if (process.client) {
    const savedPresetKey = localStorage.getItem(SELECTED_PRESET_KEY)
    if (savedPresetKey && presets.value[savedPresetKey]) {
      selectedPresetKey.value = savedPresetKey
    } else {
      // Если нет сохраненного пресета или он не существует, выбираем первый доступный
      const firstPresetKey = Object.keys(presets.value)[0]
      if (firstPresetKey) {
        selectedPresetKey.value = firstPresetKey
        localStorage.setItem(SELECTED_PRESET_KEY, selectedPresetKey.value)
      }
    }
  } else {
    // На сервере выбираем первый доступный пресет
    const firstPresetKey = Object.keys(presets.value)[0]
    if (firstPresetKey) {
      selectedPresetKey.value = firstPresetKey
    }
  }
  
  loadSelectedPreset()
})

// Автосохранение при изменении пресета
watch(currentPreset, () => {
  if (selectedPresetKey.value) {
    saveCurrentPreset()
  }
}, { deep: true })
</script>

<style scoped>
/* Анимации для правил */
.rule-enter-active {
  transition: all 0.3s ease-out;
}

.rule-leave-active {
  transition: all 0.3s ease-in;
}

.rule-enter-from {
  opacity: 0;
  transform: translateX(-30px) scale(0.8);
}

.rule-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.8);
}

.rule-move {
  transition: transform 0.3s ease;
}

/* Улучшенная анимация fade-in */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style> 