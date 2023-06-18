import { API_URL } from "./constant";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const userChronoInfo = (data) => {
  const body = JSON.stringify(data);  
  return fetch(API_URL.USER_INFO, {
    method: "POST",
    headers
  }, body).then((res) => res.json())
}

export const checkUser = async ({emailid, fa2=false}) => {
  const body = JSON.stringify({
    emailid,
    fa2  
  })  
  const response =  await fetch(API_URL.USER_INFO, {
    method: "POST",
    headers,
    body
  }).then((res) => res.json());
  return response;  
}

export const getRandomPassword = async () => {
  const response = await fetch(API_URL.RANDOM_PASSWORD, {
    method: "GET",
    headers
  }).then((res) => res.json());
  return response;

}