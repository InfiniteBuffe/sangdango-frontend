export const checkStudentId = (studentId) => {

    let sid = String(studentId)
    let error = false

    // 학번은 5자리 고정
    if (sid.length !== 5) {
        error = true
    }

    // 학년 검사
    if (sid[0] === '0' || Number(String(sid)[0]) > 3) {
        error = true
    }

    // 반 검사
    if (Number(sid.slice(1, 3)) > 15 || Number(String(sid).slice(1, 3)) === 0) { // 반은 최대 15반까지
        error = true
    }

    // 번호 검사
    if (Number(sid.slice(3)) > 35 || Number(String(sid).slice(3)) === 0) { // 번호는 최대 35번까지
        error = true
    }

    return !error
}