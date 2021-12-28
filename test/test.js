/* global describe, before, it */

'use strict';

let assert = require('assert');
let path = require('path');
let moment = require('moment');
let scraper = require('../src/scraper');

describe('catalog.js', function () {
  let catalog;

  before(function (done) {
    this.timeout(10000);

    scraper('201590')
      .catalogFromFile(path.join(__dirname, 'test.xml'))
      .then(function (scraped) {
        catalog = scraped;
        done();
      });
  });

  describe('catalog', function () {
    it('should have 886 courses', function () {
      assert.equal(catalog.courses.length, 886);
    });

    it('should parse the Middlebury catalog link', function () {
      assert.equal(catalog.href, 'http://catalog.middlebury.edu/offerings/searchxml/catalog/catalog%2FMCUG/term/term%2F201590/level/topic%2Flevel%2FUG/type/genera%3Aoffering%2FLCT/type/genera%3Aoffering%2FLAB/type/genera%3Aoffering%2FDSC/type/genera%3Aoffering%2FPE/type/genera%3Aoffering%2FSEM/location/resource%2Fplace%2Fcampus%2FM/time_start/0/time_end/86400/search/Search');
    });

    it('should parse the term', function () {
      assert.equal(catalog.term.id, '201590');
      assert.equal(catalog.term.text, 'Fall 2015');
      assert.equal(catalog.term.href, 'http://catalog.middlebury.edu/terms/view/catalog/catalog%2FMCUG/term/term%2F201590');
      assert.equal(catalog.term.season, 'fall');
      assert.equal(catalog.term.year, '2015');
    });
  });

  describe('course', function () {

    it('should parse the title', function() {
      assert.equal(catalog.courses[0].title, 'Politics, Media, Pop. Culture');
    });

    it('should parse the href', function () {
      assert.equal(catalog.courses[0].href, 'http://catalog.middlebury.edu/offerings/view/catalog/catalog%2FMCUG/offering/section%2F201590%2F92348');
    });

    it('should parse the code', function () {
      assert.equal(catalog.courses[0].code, 'AMST0102A-F15');
    });

    it('should parse the description', function () {
      assert.equal(catalog.courses[0].description, '<strong>Politics, Media, Popular Culture</strong><br />\nIn this course, we will examine U.S. politics and popular culture in the period 1941-2015. We will analyze political films ranging from the World War II propaganda series, <em>Why We Fight</em>, to more recent feature films such as <em>Wag the Dog</em> and <em>Good Night and Good Luck</em>.  We will consider television\u2019s impact on civic culture, focusing on entertainment programs (<em>I Led 3 Lives</em>, <em>24</em>, <em>Scandal</em>), the news (<em>See It Now</em>, <em>The O\u2019Reilly Factor</em>), campaign commercials, and political satire (<em>The Daily Show</em>, <em>The Colbert Report</em>). Finally, we will assess how online organizing and the blogosphere impact civic participation. 3 hrs. lect.');
    });

    it('should parse the type', function () {
      assert.equal(catalog.courses[0].type.id, 'LCT');
      assert.equal(catalog.courses[0].type.text, 'Lecture');
    });

    it('should parse the term', function () {
      let course = catalog.courses[0];

      assert.equal(course.term.id, '201590');
      assert.equal(course.term.text, 'Fall 2015');
      assert.equal(course.term.href, 'http://catalog.middlebury.edu/terms/view/catalog/catalog%2FMCUG/term/term%2F201590');
      assert.equal(course.term.season, 'fall');
      assert.equal(course.term.year, '2015');
    });

    it('should parse the department', function () {
      let course = catalog.courses[0];

      assert.equal(course.department.id, 'AMST');
      assert.equal(course.department.text, 'Program in American Studies');
      assert.equal(course.department.href, 'http://catalog.middlebury.edu/topics/view/catalog/catalog%2FMCUG/term/term%2F201590/topic/topic%2Fdepartment%2FAMST');
    });

    it('should parse the requirements', function () {
      let course = catalog.courses[0];
      assert.equal(course.requirements.length, 2);

      let hisRequirement = course.requirements[0];
      assert.equal(hisRequirement.id, 'HIS');
      assert.equal(hisRequirement.text, 'HIS');
      assert.equal(hisRequirement.href, 'http://catalog.middlebury.edu/topics/view/catalog/catalog%2FMCUG/term/term%2F201590/topic/topic%2Frequirement%2FHIS');

      let norRequirement = course.requirements[1];
      assert.equal(norRequirement.id, 'NOR');
      assert.equal(norRequirement.text, 'NOR');
      assert.equal(norRequirement.href, 'http://catalog.middlebury.edu/topics/view/catalog/catalog%2FMCUG/term/term%2F201590/topic/topic%2Frequirement%2FNOR');
    });

    it('should parse the level', function () {
      let course = catalog.courses[0];

      assert.equal(course.level.id, 'UG');
      assert.equal(course.level.text, 'Undergraduate');
      assert.equal(course.level.href, 'http://catalog.middlebury.edu/topics/view/catalog/catalog%2FMCUG/term/term%2F201590/topic/topic%2Flevel%2FUG');
    });

    it('should parse the instructor', function () {
      let course = catalog.courses[0];
      assert.equal(course.instructors.length, 1);

      let instructor = course.instructors[0];

      assert.equal(instructor.id, 'eb22314a852970f29d9c828dec3265d2');
      assert.equal(instructor.text, 'Holly Allen');
      assert.equal(instructor.href, 'http://catalog.middlebury.edu/resources/view/catalog/catalog%2FMCUG/resource/resource%2Fperson%2Feb22314a852970f29d9c828dec3265d2');
      assert.equal(instructor.name, 'Holly Allen');
    });

    it('should parse the location', function () {
      let course = catalog.courses[0];

      assert.equal(course.location.id, 'AXN/229');
      assert.equal(course.location.text, 'Axinn Center 229');
      assert.equal(course.location.href, 'http://catalog.middlebury.edu/resources/view/catalog/catalog%2FMCUG/resource/resource%2Fplace%2Froom%2FAXN%2F229');
      assert.equal(course.location.building, 'AXN');
      assert.equal(course.location.room, '229');
    });

    it('should parse the schedule', function () {
      let course = catalog.courses[0];

      assert.equal(course.schedule.text, '12:15pm-1:30pm on Monday, Wednesday (Sep 16, 2015 to Dec 11, 2015)');
      assert.equal(course.schedule.meetings.length, 1);

      let meeting = course.schedule.meetings[0];
      assert.ok(moment('12:15pm', 'hh:mma').isSame(meeting.startTime));
      assert.ok(moment('1:30pm', 'hh:mma').isSame(meeting.endTime));
      assert.equal(meeting.days.length, 2);
      assert.deepEqual(meeting.days, ['Monday', 'Wednesday']);
      assert.ok(moment('9/16/2015', 'MM/DD/YYYY').isSame(meeting.startDate));
      assert.ok(moment('12/11/2015', 'MM/DD/YYYY').isSame(meeting.endDate));
    });

    it('should parse the crn', function () {
      assert.equal(catalog.courses[0].crn.id, '92348');
    });
  });
});
