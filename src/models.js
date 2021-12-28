const _ = require('lodash');

const Catalog = function (options) {
  _.defaults(options || (options = {}), {
    raw: '',
    href: '',
    term: '',
    courses: []
  });

  _.extend(this, options);
};
exports.Catalog = Catalog;

const Course = function (options) {
  _.defaults(options || (options = {}), {
    href: null,
    code: null,
    description: null,
    title: null,
    alternate: null,
    type: null,
    department: null,
    requirements: [],
    instructors: [],
    location: null,
    schedule: null,
    crn: null
  });

  _.extend(this, options);
};
exports.Course = Course;

const Schedule = function (options) {
  _.defaults(options || (options = {}), {
    text: null,
    meetings: []
  });

  _.extend(this, options);
};
exports.Schedule = Schedule;

const Meeting = function (options) {
  _.defaults(options || (options = {}), {
    raw: null,
    startTime: null,
    endTime: null,
    startDate: null,
    endDate: null,
    days: [],
    location: null
  });

  _.extend(this, options);
};
exports.Meeting = Meeting;

const CourseInfo = function (options) {
  _.defaults(options || (options = {}), {
    rawId: null,
    href: null,
    text: null
  });

  _.extend(this, options);

  Object.defineProperty(this, 'id', {
    configurable: true,
    get: function () {
      return _.last(this.rawId.split('/'));
    }
  });
};

exports.Type = CourseInfo;
exports.Subject = CourseInfo;
exports.Department = CourseInfo;
exports.Level = CourseInfo;
exports.Requirement = CourseInfo;
exports.CRN = CourseInfo;

const Location = function (options) {
  CourseInfo.call(this, options);

  Object.defineProperties(this, {
    'room': {
      get: function () {
        if (this.rawId.indexOf('/') > -1) {
          return _.last(this.rawId.split('/'));
        } else {
          throw new Error('Location ' + this.id + ' has no room.');
        }
      }
    },
    'building': {
      get: function () { //eslint-disable-line getter-return
        if (this.rawId.indexOf('/') > -1) {
          const rawIdSplit = this.rawId.split('/');
          return rawIdSplit[rawIdSplit.length - 2];
        }
      }
    },
    'id': {
      get: function () {
        if (this.rawId.indexOf('/') > -1) {
          return [this.building, this.room].join('/');
        } else {
          return _.last(this.rawId.split('/'));
        }
      }
    }
  });
};
exports.Location = Location;

const Instructor = function (options) {
  CourseInfo.call(this, options);

  Object.defineProperty(this, 'name', {
    get: function () {
      return this.text;
    }
  });
};
exports.Instructor = Instructor;

const Term = function (options) {
  CourseInfo.call(this, options);

  Object.defineProperties(this, {
    'season': {
      get: function () {
        var seasons = {'90': 'fall',
          '10': 'winter',
          '20': 'sprint'};
        return seasons[this.id.slice(4)] || 'unknown';
      }
    },
    'year': {
      get: function () {
        return this.id.slice(0, 4);
      }
    }
  });
};
exports.Term = Term;
