import CourseInfo from './CourseInfo.js';
export default class Requirement extends CourseInfo {
  constructor(options) {
    super(options);
    this._parseRequirementText();
  }
  _parseRequirementText() {
    const mapping = {
      LIT: 'Literature',
      ART: 'The Arts',
      PHL: 'Philosophical and Religious Studies',
      HIS: 'Historical Studies',
      SCI: 'Physical and Life Sciences',
      DED: 'Deductive Reasoning and Analytical Processes',
      SOC: 'Social Analysis',
      LNG: 'Forign Language',
      SOA: 'South and Southeast Asia Civilization Requirement',
      NOA: 'North Asia Civilization Requirement',
      MDE: 'Middle East and North Africa Civilization Requirement',
      SAF: 'Sub-Saharan Africa Civilization Requirement',
      EUR: 'Europe Civilization Requirement',
      AMR: 'America Civilization Requirement',
      CMP: 'Comparative Requirement',
      WTR: 'Winter Requirement',
    };
    if (this.id in mapping) {
      this.text = mapping[this.id];
    }
  }
}
