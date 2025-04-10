const axios = require("axios");

const XToken =
  "a2e8A/HBB4OfMxkCa/ELtzS5IxPVPDcNQCazuzB1NEm5kS312vZZMMkQcmBZMXqPajJ+cLph+eMillNKnTT9Nyeu5hKBX5XrCZKyOFHNKAx4QnNAo6UOet5Xm2Sh+1iMVeCWPKiFMw==";
const CT_AT =
  "eyJraWQiOiJjMjM3NDM1OC1lYzZlLTRkNjgtOTFlNS0zMjVkM2I4YjVkMmMiLCJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJleHQiOnsiTFNJRCI6IjE4MTY5MGNkLWViMTktNDJkNS1hZWY5LTc0YWU4OWM1ZDVhOCIsIk5PTkNFIjoiYzRlNWFmNzQ5NDBhNTYwNTY3ODljMDZiNTE5NzllMzYiLCJmaWF0IjoxLjc0NDAyODU1M0U5LCJGQUdFIjoiMyJ9LCJzdWIiOiIxMjI2MzI0MTgiLCJhdWQiOlsiaHR0cHM6Ly93d3cuY291cGFuZy5jb20iLCItIl0sInNjcCI6WyJvcGVuaWQiLCJvZmZsaW5lIiwiY29yZSIsImNvcmUtc2hhcmVkIiwicGF5Il0sIm5iZiI6MTc0NDI5NTU5MCwiaXNzIjoiaHR0cHM6Ly9tYXV0aC5jb3VwYW5nLmNvbS8iLCJleHAiOjE3NDQzMDk5OTAsImlhdCI6MTc0NDI5NTU5MCwianRpIjoiNmE4MDJjYTgtMjVjYy00MDNkLTg5NzItYzFhOWQyMWQwMTUwIiwiY2xpZW50X2lkIjoiNGUyZTAyYzgtNzQ1Ni00YmQ0LTljNzUtNWI5OGYyMDU4MzgyIn0.0gVWw5GyZOZJorf4pR8imgs0rbsm80Z2AUDVM5OSCgIHhfrsOX04K-DNvv1FnrPPDiOmBxMIKYl7kE9UIhh8_A";
const AFATK =
  "a2e8A/HBB4OfMxkCa/ELtzS5IxPVPDcNQCazuzB1NEm5kS312vZZMMkQcmBZMXqPajJ+cLph+eMillNKnTT9Nyeu5hKBX5XrCZKyOFHNKAx4QnNAo6UOet5Xm2Sh+1iMVeCWPKiFMw==; ";

const reAuth = async () => {
  console.log("재인증을 합니다.");
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://partners.coupang.com/api/v1/auth",
    headers: {
      "X-Token": XToken,
      Cookie: `CT_AT=${CT_AT}; AFATK=${AFATK};`,
    },
    data: {
      password: "wjdaksrud!@3",
    },
  };

  const response = await axios.request(config);
  console.log(response);
  console.log("response", response.data.data.isPass);
  return response;
};

const getCPUrl = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://partners.coupang.com/api/v1/url/any?coupangUrl=https%3A%2F%2Fwww.coupang.com%2Fvp%2Fproducts%2F6656766691%3FitemId%3D18039017195%26vendorItemId%3D85193375594%26sourceType%3DCATEGORY%26categoryId%3D222273",
    headers: {
      "X-Token": XToken,
      Cookie: `CT_AT=${CT_AT}; AFATK=${AFATK};`,
    },
  };

  const response = await axios.request(config);
  console.log("response", response.data.data.shortUrl);
  return response;
};

const run = async () => {
  const response = await getCPUrl();
  if (response.status === 200) {
    const { rCode } = response.data;
    console.log(rCode);
    if (rCode === "0") {
      console.log(response.data);
    } else if (rCode === "403") {
      await reAuth();
      await getCPUrl();
    }
  }
};

run();
