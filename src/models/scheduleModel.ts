import { getToken } from "./tokenModel";
// Office 365 API 호출을 위한 라이브러리를 사용해야 합니다.

export async function getSchedule() {
    const token = getToken();
    if (!token) {
        return null;
    }

    // Office 365 API를 사용하여 일정 데이터를 가져옵니다.
    // 여기에 실제로 API를 호출하는 코드를 작성해야 합니다.

    // 예시 데이터 반환
    return {
        current: null,
        today: [],
        defaultMessage: "",
    };
}
