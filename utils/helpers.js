import moment from "moment";

export const getTimeElapsedWithPerspective = (createdAt) => {
  const elapsedTimeDurationInMoment = moment.duration(moment().diff(createdAt));
  let timeElapsed;

  if (elapsedTimeDurationInMoment.asDays() >= 1) {
    timeElapsed = {
      value: elapsedTimeDurationInMoment.asDays(),
      timeUnit: elapsedTimeDurationInMoment.asDays() < 2 ? "day" : "days",
    };
  }

  if (elapsedTimeDurationInMoment.asHours() < 24) {
    timeElapsed = {
      value: elapsedTimeDurationInMoment.asHours(),
      timeUnit: elapsedTimeDurationInMoment.asHours() < 2 ? "hour" : "hours",
    };
  }

  if (elapsedTimeDurationInMoment.asMinutes() < 60) {
    timeElapsed = {
      value: elapsedTimeDurationInMoment.asMinutes(),
      timeUnit:
        elapsedTimeDurationInMoment.asMinutes() < 2 ? "minute" : "minutes",
    };
  }

  if (elapsedTimeDurationInMoment.asSeconds() < 60) {
    timeElapsed = {
      value: elapsedTimeDurationInMoment.asSeconds(),
      timeUnit:
        elapsedTimeDurationInMoment.asSeconds() < 2 ? "second" : "seconds",
    };
  }

  return timeElapsed;
};
