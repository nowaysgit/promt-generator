export const AUTO_RESUME_SCRIPT = `!function(){console.log("Cursor Auto Resume: Running");let t=0;function e(){const e=Date.now();if(e-t<3e3)return;const n=document.querySelectorAll("body *");for(const o of n)if(o&&o.textContent&&(o.textContent.includes("stop the agent after 25 tool calls")||o.textContent.includes("Note: we default stop"))){const n=o.querySelectorAll('a, span.markdown-link, [role="link"], [data-link]');for(const o of n)if("resume the conversation"===o.textContent.trim())return console.log('Clicking "resume the conversation" link'),o.click(),void(t=e)}}setInterval(e,1e3),e()}();`

export const useConstants = () => {
  return {
    AUTO_RESUME_SCRIPT
  }
} 