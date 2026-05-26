import { initCursorGlow } from './cursorGlow.js';
import { initParticles } from './particles.js';
import { initSkillsTags } from './skillsTags.js';
import { initPortfolio } from './portfolio.js';
import { initPricing } from './pricing.js';
import { initAvailabilityStatus } from './availabilityStatus.js';
import { initSectionReveal } from './sectionReveal.js';

function init() {
    initCursorGlow();
    initParticles();
    initSkillsTags();
    initPricing();
    initAvailabilityStatus();
    initSectionReveal();
    initPortfolio();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
