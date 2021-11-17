const questions = {"0-1-0": false, "0-1-1": false, "0-1-2": true};

function checkAnswer(a, b, c) {
    let question = String(a) + "-" + String(b) + "-" + String(c);
    let element = document.getElementById(question);
    const result_id = "a-" + String(b);
    let quiz_result = document.getElementById(result_id);
    quiz_result.style.display = "block";
    if (questions[question]) {
        // cssに正解クラスを追加
        element.classList.add("correct");
        let successed = quiz_result.getElementsByClassName("quiz-result-title");
        successed[0].classList.add("quiz-result-successed");
    } else {
        // cssに不正解クラスを追加
        element.classList.add("incorrect");
        let failed = quiz_result.getElementsByClassName("quiz-result-title")
        failed[0].classList.add("quiz-result-failed");
    }
};
