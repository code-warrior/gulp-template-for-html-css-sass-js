/**
 * SHOW MAIN
 *
 * Reveals the <main> element, then, after 50 milliseconds, adds a class that
 * triggers a transition—thus the name—via CSS.
 */
function showMain() {
    'use strict';

    main.style.display = 'block';

    setTimeout(
        function () {
            main.setAttribute('class', 'transition');
        },
        50
    );
}

/**
 * SHOW QUESTION “WHERE WAS LINCOLN BORN?”
 *
 * The question “Where Was Lincoln Born?” and the <form> used to answer it are both
 * wrapped in a <section> container, which is turned off by default; that is,
 * display is set to “none” in the CSS. This function simply reveals that container.
 */
function showQuestionWhereWasLincolnBorn() {
    'use strict';

    whereWasLincolnBornQuestionContainer.style.display = 'block';
}

/**
 * SHOW QUESTION “WHO ASSASSINATED LINCOLN?”
 *
 * Firing off this function displays the container for the question “Who Assassinated
 * Lincoln?”, then removes the “Submit” button associated with the question “Where
 * Was Lincoln Born?” and the “Next Question” button that is shown when the user
 * answers the “Where Was Lincoln Born?” question correctly. The drop down menu
 * showing the location options of Lincoln’s birth is disabled, also.
 */
function showQuestionWhoAssassinatedLincoln() {
    'use strict';

    whoAssassinatedLincolnQuestionContainer.style.display = 'block';
    submitLincolnsBirthPlace.style.display = 'none';
    moveToQuestion2.style.display = 'none';
    lincolnsBirthPlace.setAttribute('disabled', 'disabled');
}

/**
 * SHOW RESULTS
 *
 * This function does for the question “Who Assassinated Lincoln?” what the function
 * showQuestionWhoAssassinatedLincoln() does for the question “Where Was Lincoln
 * Born?” Except, however, that it doesn’t trigger the display for a new question.
 *
 * You can choose to display some results about how the user answered these
 * questions. For example, how long they took to take this quiz, or how many times
 * they chose a drop down option before choosing the correct answer.
 *
 * In other words, this is a homework function that you might want to modify.
 */
function showResults() {
    'use strict';

    submitNameOfLincolnsAssassin.style.display = 'none';
    moveToQuestion3.style.display = 'none';
    lincolnsAssassin.setAttribute('disabled', 'disabled');
}

/**
 * CHECK ANSWER TO LINCOLN’S BIRTH PLACE QUESTION
 *
 * The first thing this function does is create a reference to the <p>aragraph child
 * of the <section> element on line 42 of “index.html,” because this is where I’ll be
 * rendering feedback on the answer the user submits.
 *
 * The switch statement is checking the value submitted by the <option> element of
 * the form bound to the question “Where Was Lincoln Born?” In each of the three
 * cases, “lansing,” “hodgenville,” and “washington,” the transition class is removed
 * from the <section> element (line 27 in the HTML file) so that a new transition can
 * be included later in each of the three cases.
 *
 * Also, in each of the three cases, following the removal of the class “transition,”
 * a timer is set to run after 250 milliseconds that fills the paragraph child of the
 * section element. The lines containing p.innerHTML are self-explanatory.
 *
 * Within the same timer, the transition class is added anew.
 *
 * In the “hodgenville” case, which is the correct answer to the question regarding
 * the location of Lincoln’s birth place, a button with the text “Next Question” is
 * set to display, and a second timer is added for the transition of that button.
 */
function checkAnswerToLincolnsBirthPlaceQuestion() {
    'use strict';

    var aside =
            whereWasLincolnBornQuestionContainer.getElementsByTagName('aside')[0],
        p = aside.getElementsByTagName('p')[0],
        moveToQuestion2 = document.getElementById('move-to-question-2');

    switch (lincolnsBirthPlace.value) {
        case 'lansing':
            aside.classList.remove('transition');
            setTimeout(
                function () {
                    p.innerHTML = '<span class="fa fa-remove"></span> You chose ' +
                        'Lansing, Michigan. This is incorrect, as Lansing wasn’t ' +
                        'settled until 1835, years after Lincoln’s birth.';
                    aside.setAttribute('class', 'transition');
                },
                250
            );

            break;

        case 'hodgenville':
            aside.classList.remove('transition');
            setTimeout(
                function () {
                    p.innerHTML = '<span class="fa fa-check"></span> Hodgenville, ' +
                        'Kentucky is correct!';
                    aside.setAttribute('class', 'transition');
                    moveToQuestion2.style.display = 'inline';
                    setTimeout(
                        function () {
                            moveToQuestion2.setAttribute('class', 'transition');
                        },
                        20
                    );
                },
                250
            );

            break;

        case 'washington':
            aside.classList.remove('transition');
            setTimeout(
                function () {
                    p.innerHTML = '<span class="fa fa-remove"></span> Although ' +
                        'Washington <abbr title="District of Columbia">DC</abbr> ' +
                        'eventually becomes his home, Lincoln was not born here.';
                    aside.setAttribute('class', 'transition');
                },
                250
            );

            break;
    }
}

/**
 * CHECK ANSWER TO LINCOLN’S ASSASSINATION QUESTION
 *
 * This function works exactly as the previous function, but for the <section> with
 * ID “who-assassinated-lincoln-question-container.”
 */
function checkAnswerToLincolnsAssassinQuestion() {
    'use strict';

    var aside =
            whoAssassinatedLincolnQuestionContainer.getElementsByTagName('aside')[0],
        p = aside.getElementsByTagName('p')[0],
        moveToQuestion3 = document.getElementById('move-to-question-3');

    switch (lincolnsAssassin.value) {
        case 'lee-oswald':
            aside.classList.remove('transition');
            setTimeout(
                function () {
                    p.innerHTML = '<span class="fa fa-remove"></span> Lee Harvey ' +
                        'Oswald did assassinate a president, but it wasn’t ' +
                        'Lincoln. He took the life of John F Kennedy on 22 ' +
                        'November 1963.';
                    aside.setAttribute('class', 'transition');
                },
                250
            );

            break;
        case 'john-booth':
            aside.classList.remove('transition');
            setTimeout(
                function () {
                    p.innerHTML = '<span class="fa fa-check"></span> Indeed, the ' +
                        'actor John Wilkes Booth killed Lincoln in a cowardly ' +
                        'act, shooting the president from behind.';
                    aside.setAttribute('class', 'transition');
                    moveToQuestion3.style.display = 'inline';
                    setTimeout(
                        function () {
                            moveToQuestion3.setAttribute('class', 'transition');
                        },
                        20
                    );
                },
                250
            );

            break;
        case 'john-hinckley':
            aside.classList.remove('transition');
            setTimeout(
                function () {
                    p.innerHTML = '<span class="fa fa-remove"></span> John ' +
                        'Hinckley Jr never killed a president, but he attempted ' +
                        'to assassinate Ronald Reagan in 1981.';
                    aside.setAttribute('class', 'transition');
                },
                250
            );

            break;
    }
}

/**
 * SET USERS NAME
 *
 * This function populates the paragraph element in the “index.html” file on line 13
 * (<p id="show-users-name"></p>) with the input entered in the form whose container
 * is on line 14.
 *
 * If the input entered by the user into the form is empty, an error message is
 * displayed. Otherwise,
 *
 *    1. greet the user
 *    2. hide the form the user just used to enter her/his name
 *    3. display the <main> element, whose display is set to “none” by default
 *    4. display the first question, Where Was Lincoln Born?
 *    5. and, finally, wait 50 milliseconds before adding a class called “transition”
 *       to the paragraph that greets the user (<p id="show-users-name"></p>).
 */
function setUsersName() {
    'use strict';

    if (usersName.value === '') {
        showUsersName.innerHTML = '<span class="error-highlight">Nothing ' +
            'entered. Please try again.</span>';

    } else {
        showUsersName.textContent = 'Hi, ' + usersName.value;
        nameContainer.style.display = 'none';
        showMain();
        showQuestionWhereWasLincolnBorn();

        setTimeout(
            function () {
                showUsersName.setAttribute('class', 'transition');
            },
            50
        );
    }
}
