import ironman from "./base";

const TRAINING_URL = '/training';

export const httpGetAllTrainings = async () => {
  const {data} = await ironman.get(TRAINING_URL);
  return data;
};

export const httpGetTrainingsByDateRange = async ({ from, to }) => {
  const {data} = await ironman.get(`${TRAINING_URL}?dateFrom=${from}&dateTo=${to}`);
  return data;
};

export const httpAddTraining = async (params) => {
  const {data} = await ironman.post(TRAINING_URL, params);
  console.log(data);
  return data;
};

// export const getApodsByDatesRange = async (from, to) => {
//   const {data} = await NasaClient.get(`${APOD_URL}?start_date=${from}&end_date=${to}`);
//   return data;
// };
//
// export const getRandomApods = async (count = 6) => {
//   const {data} = await NasaClient.get(`${APOD_URL}?count=${count}`);
//   return data;
// };
