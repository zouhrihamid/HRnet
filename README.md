# Hrnet

Ce projet est une application de gestion des employés réalisée dans le cadre de ma formation. La société WealthHealth utilise une application web interne, HRNet, qui gère les dossiers des employés. L'application, basée sur jQuery côté front-end, était ancienne et sujette à de nombreux bugs. L’objectif a été de convertir entièrement HRNet en **React** afin de moderniser son architecture et d’améliorer sa stabilité. Un des quatre plugins jQuery a été converti en composant React et publié sur npm, tandis que les trois autres ont été remplacés par des composants React internes. L’application permet désormais de gérer la liste des employés, leurs informations personnelles, et propose des fonctionnalités modernes telles que l’ajout, la recherche en temps réel, le tri, la suppression, ainsi que la pagination

=================================================================================================================================

## Description

Ce projet permet de gérer des informations sur les employés dans une entreprise. Il propose des fonctionnalités telles que :

    **Ajouter un employé
    **Voir les détails d'un employé
    **Trier les employés par différentes colonnes
    **Rechercher des employés par nom, prénom, ville, département, etc.
    **Supprimer un employé
    **Pagination de la liste des employés

======================================================================================================================================

## Installation

npm install
npm install @mui/x-date-pickers dayjs
npm install my-input-select-library@latest

=====================================================================================================================================

## Fonctionnalités

Ajout d'un employé : Ajoutez un nouvel employé en remplissant un formulaire avec les informations requises.

Affichage des employés : Liste des employés avec la possibilité de trier et de rechercher.

Tri des employés : Tri des employés par prénom, nom, date de naissance, etc.

Recherche en temps réel : Recherchez les employés par nom, etc.

Suppression d'un employé : Supprimez un employé de la liste.

Pagination : Naviguez entre les pages d'employés pour gérer un grand nombre d'entrées.

========================================================================================================================================

## Structure du projet

/src

    /components
        /atoms
            Button.jsx
            CustomDatePicker.jsx
            CustomSelectInput.jsx
            InputField.jsx
        /molecules
            AddressCieldset.jsx
            EmployeeRow.jsx
            InputGroup.jsx
        /organisms
            EmployeeForm.jsx
            Footer.jsx
            Header.jsx
            Modal.jsx

    /data
        data.js
        mockEmployees.js

    /pages
        Home.js
        Employees.js

    /styles
        customdate.css
        employees.css
        footer.css
        header.css
        home.css
        inputField.css
        modal.css
        selectInput.css
        validation.css

    /utils
        formValidation.jsx

    App.jsx
    main.jsx
    App.css

=========================================================================================================

## Technologies utilisées

React : Bibliothèque JavaScript pour la construction de l'interface utilisateur.

React Router : Pour gérer la navigation entre les pages.

FontAwesome : Pour l'intégration des icônes.

CSS : Pour la mise en page et le style global de l'application.

==========================================================================================================================================================

### Prérequis

Assurez-vous d'avoir installé **Node.js** et **npm** (ou **yarn**) avant de commencer. Vous pouvez télécharger et installer Node.js depuis [nodejs.org](https://nodejs.org/).

==============================================================================================================================================================

### Cloner le projet

Clonez ce repository sur votre machine locale
