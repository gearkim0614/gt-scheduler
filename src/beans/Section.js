import { stringToTime, unique } from '../utils';

class Section {
  constructor(course, sectionId, data) {
    const [crn, meetings, credits] = data;

    this.course = course;
    this.id = sectionId;
    this.crn = crn;
    this.credits = credits;
    this.meetings = meetings.map(([period, days, where, instructors, dateRangeIndex]) => ({
      period: period === 'TBA' ? undefined : {
        start: stringToTime(period.split(' - ')[0]),
        end: stringToTime(period.split(' - ')[1]),
      },
      days: days === '&nbsp;' ? [] : [...days],
      where,
      instructors: instructors.map(instructor => instructor.replace(/ \(P\)$/, '')),
      dateRangeIndex,
    }));
    this.instructors = unique(this.meetings.reduce((instructors, meeting) => [...instructors, ...meeting.instructors], []));
  }
}

export default Section;
