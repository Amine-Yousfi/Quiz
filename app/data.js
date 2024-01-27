export const quiz = {
  totalQuestions: 10,
  questions: [
    {
      id: 1,
      question: "Qu'est-ce qu'un Scrum ?",
      answers: [
        "Un framework agile de gestion de projet",
        "Un langage de programmation",
        "Un logiciel de gestion des ressources humaines",
      ],
      correctAnswer: "Un framework agile de gestion de projet",
    },
    {
      id: 2,
      question: "Qu'est-ce qu'un sprint dans Scrum ?",
      answers: [
        "Une période de temps fixe pendant laquelle l'équipe Scrum travaille pour livrer un incrément de produit",
        "Une réunion de planification où l'équipe Scrum discute des obstacles rencontrés",
        "Une technique de gestion de projet pour suivre les tâches et les délais",
      ],
      correctAnswer:
        "Une période de temps fixe pendant laquelle l'équipe Scrum travaille pour livrer un incrément de produit",
    },
    {
      id: 3,
      question: "Quelles sont les quatre valeurs fondamentales de l'agilité ?",
      answers: [
        "Planification, organisation, exécution, contrôle",
        "Individus et interactions, processus et outils, documentation exhaustive, planification détaillée",
        "Individus et interactions, fonctionnalités opérationnelles, collaboration avec le client, adaptation au changement",
      ],
      correctAnswer:
        "Individus et interactions, fonctionnalités opérationnelles, collaboration avec le client, adaptation au changement",
    },
    {
      id: 4,
      question: "Quelles sont les trois catégories de rôles dans Scrum ?",
      answers: [
        "Product Owner, Scrum Master, Développeurs",
        "Planificateur, Exécutant, Superviseur",
        "Gestionnaire de Projet, Analyste d'affaires, Testeur",
      ],
      correctAnswer: "Product Owner, Scrum Master, Développeurs",
    },
    {
      id: 5,
      question: "Quel est le rôle du Product Owner dans Scrum ?",
      answers: [
        "Gérer l'équipe de développement",
        "Déterminer les fonctionnalités à développer et leur ordre de priorité",
        "Assurer que l'équipe suit les bonnes pratiques de codage",
      ],
      correctAnswer:
        "Déterminer les fonctionnalités à développer et leur ordre de priorité",
    },
    {
      id: 6,
      question: "Combien de temps dure un Sprint dans Scrum en général ?",
      answers: ["1 semaine", "1 mois", "2 semaines"],
      correctAnswer: "2 semaines",
    },
    {
      id: 7,
      question: "Quel est le but d'une rétrospective Scrum ?",
      answers: [
        "Examiner les progrès réalisés lors du Sprint",
        "Identifier les obstacles et les moyens de les surmonter",
        "Évaluer la performance des individus dans l'équipe",
      ],
      correctAnswer: "Identifier les obstacles et les moyens de les surmonter",
    },
    {
      id: 8,
      question: "Quel événement Scrum se produit à la fin de chaque Sprint ?",
      answers: ["Sprint Review", "Daily Scrum", "Sprint Retrospective"],
      correctAnswer: "Sprint Review",
    },
    {
      id: 9,
      question:
        "Qui est responsable de la gestion du Product Backlog et de son ordre de priorité ?",
      answers: [
        "Le Scrum Master",
        "L'équipe de développement",
        "Le Product Owner",
      ],
      correctAnswer: "Le Product Owner",
    },
    {
      id: 10,
      question:
        "Quelle est la différence entre un Product Backlog et un Sprint Backlog ?",
      answers: [
        "Le Product Backlog contient les fonctionnalités à développer, tandis que le Sprint Backlog contient les tâches à réaliser dans un Sprint spécifique.",
        "Le Sprint Backlog contient les fonctionnalités à développer, tandis que le Product Backlog contient les tâches à réaliser dans un Sprint spécifique.",
        "Ils contiennent tous deux les mêmes informations, mais sont utilisés à des moments différents du projet.",
      ],
      correctAnswer:
        "Le Product Backlog est une liste ordonnée de fonctionnalités à développer, tandis que le Sprint Backlog est une liste des tâches spécifiques à accomplir pendant le sprint actuel.",
    },
  ],
};
