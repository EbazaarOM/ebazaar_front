const DaysOfWeek = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesdey: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
};

const TO_HOUR = 18;

export const getDeliveryDate = () => {
  const date = new Date();

  let dayETA = 1;
  const hour = date.getHours();
  const day = date.getDay();

  if (hour >= TO_HOUR) {
    switch (day) {
      case DaysOfWeek.Sunday:
        dayETA = 2;
        break;
      case DaysOfWeek.Monday:
        dayETA = 2;
        break;
      case DaysOfWeek.Tuesday:
        dayETA = 2;
        break;
      case DaysOfWeek.Wednesdey:
        dayETA = 2;
        break;
      case DaysOfWeek.Thursday:
        dayETA = 2;
        break;
      case DaysOfWeek.Friday:
        dayETA = 2;
        break;
      case DaysOfWeek.Saturday:
        dayETA = 3;
        break;

      default:
        break;
    }
  } else {
    switch (day) {
      case DaysOfWeek.Sunday:
        dayETA = 2;
        break;
      case DaysOfWeek.Monday:
        dayETA = 1;
        break;
      case DaysOfWeek.Tuesday:
        dayETA = 1;
        break;
      case DaysOfWeek.Wednesdey:
        dayETA = 1;
        break;
      case DaysOfWeek.Thursday:
        dayETA = 1;
        break;
      case DaysOfWeek.Friday:
        dayETA = 1;
        break;
      case DaysOfWeek.Saturday:
        dayETA = 2;
        break;

      default:
        break;
    }
  }
  return new Date(date.setDate(date.getDate() + dayETA)).toDateString();
};
