/**
 * ONLOAD
 *
 * This function binds all the global variables established at the beginning of this
 * JavaScript file to all the ID attributes in “index.html.” It also binds the click
 * event listeners to each of the buttons found in “index.html.”
 */
window.onload = function () {
    'use strict';

    lincolnsBirthPlace = document.getElementById('lincolns-birth-place');
    lincolnsAssassin = document.getElementById('lincolns-assassin');
    main = document.getElementsByTagName('main')[0];
    moveToQuestion2 = document.getElementById('move-to-question-2');
    moveToQuestion3 = document.getElementById('move-to-question-3');
    nameContainer = document.getElementById('name-container');
    showUsersName = document.getElementById('show-users-name');
    submitLincolnsBirthPlace = document.getElementById(
        'submit-lincolns-birth-place'
    );
    submitNameOfLincolnsAssassin = document.getElementById(
        'submit-name-of-lincolns-assassin'
    );
    submitUsersName = document.getElementById('submit-users-name');
    usersName = document.getElementById('users-name');
    whereWasLincolnBornQuestionContainer = document.getElementById(
        'where-was-lincoln-born-question-container'
    );
    whoAssassinatedLincolnQuestionContainer = document.getElementById(
        'who-assassinated-lincoln-question-container'
    );

    submitUsersName.addEventListener(
        'click',
        setUsersName,
        false
    );

    submitNameOfLincolnsAssassin.addEventListener(
        'click',
        checkAnswerToLincolnsAssassinQuestion,
        false
    );

    submitLincolnsBirthPlace.addEventListener(
        'click',
        checkAnswerToLincolnsBirthPlaceQuestion,
        false
    );

    moveToQuestion2.addEventListener(
        'click',
        showQuestionWhoAssassinatedLincoln,
        false
    );

    moveToQuestion3.addEventListener(
        'click',
        showResults,
        false
    );
};
