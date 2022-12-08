/* eslint-disable */
export const partners = [
    {
        id: '0a8bc517-631a-4a93-aacc-000fa2e8294c',
        avatar: 'assets/images/avatars/female-20.jpg',
        /*         background  : 'assets/images/cards/24-640x480.jpg', */
        name: 'Claudio Cesare Linares Rendon',
        email: 'ccesare@ecotec.edu.ec',
        /*         phoneNumbers: [
                    {
                        country: 'af',
                        phoneNumber: '838 562 2769',
                        label      : 'Mobile'
                    }
                ], */
        /*         title: 'ccesare',
                company: 'Docente', */
        /*         birthday    : '1976-09-09T12:00:00.000Z',
                address     : '946 Remsen Street, Caroline, New Mexico, PO3247', */
        username: 'ccesare',
        clubes: [
            '56ddbd47-4078-4ddd-8448-73c5e88d5f59'
        ],
        rol: 'Docente-Tutor'
    },
    {
        id: 'cdcc62e4-1520-4ccc-803d-52868c7e01ba',
        avatar: 'assets/images/avatars/female-04.jpg',
        /*         background  : 'assets/images/cards/29-640x480.jpg', */
        name: 'Deborah Griselda Rios Soto',
        email: 'dgriselda@est.ecotec.edu.ec',
        /*         phoneNumbers: [
                    {
                        country: 'al',
                        phoneNumber: '855 445 2483',
                        label: 'Mobile'
                    }
                ], */
        /*         title: 'dgriselda',
                company: 'Líder Estudiantil', */
        /*         birthday    : '1996-06-17T12:00:00.000Z', */
        /*    address     : '956 Pierrepont Street, Crumpler, Hawaii, PO3299', */
        username: 'dgriselda',
        clubes: [
            '56ddbd47-4078-4ddd-8448-73c5e88d5f59'
        ],
        rol: 'Líder Estudiantil'
    },
    {
        id: '22f18d47-ff8d-440e-888d-a1747c093052',
        avatar: 'assets/images/avatars/female-12.jpg',
        /*         background  : 'assets/images/cards/14-640x480.jpg', */
        name: 'Alida Vanina Mares Osorio',
        email: 'avanina@ecotec.edu.ec',
        /*         phoneNumbers: [
                    {
                        country: 'dz',
                        phoneNumber: '881 472 3113',
                        label: 'Mobile'
                    }
                ],
                title: 'avanina',
                company: 'Docente',
                birthday    : '1985-09-17T12:00:00.000Z',
                address     : '387 Holt Court, Thomasville, Alaska, PO2867', */
        username: 'avanina',
        clubes: [
            'cbde2486-5033-4e09-838e-e901b108cd41'
        ],
        rol: 'Docente-Tutor'
    },
    {
        id: '114642a2-ccb7-4cb1-ad2b-5e9b6a0c1d2e',
        avatar: 'assets/images/avatars/male-09.jpg',
        /*    background  : 'assets/images/cards/23-640x480.jpg', */
        name: 'Bartolo Vito Caraballo Quinonez',
        email: 'bvito@est.ecotec.edu.ec',
        phoneNumbers: [
            {
                country: 'as',
                phoneNumber: '928 567 2521',
                label: 'Mobile'
            }
        ],
        /*         title: 'bvito',
                company: 'Líder Estudiantil',
                birthday    : '1967-03-02T12:00:00.000Z',
                address     : '386 Vernon Avenue, Dragoon, North Carolina, PO4559', */
        username: 'bvito',
        clubes: [
            '56ddbd47-4078-4ddd-8448-73c5e88d5f59'
        ],
        rol: 'Líder Estudiantil'
    }
];
/* export const countries = [
    {
        id          : '19430ee3-b0fe-4987-a7c8-74453ad5504d',
        iso         : 'af',
        name        : 'Afghanistan',
        code        : '+93',
        flagImagePos: '-1px -3180px'
    },
    {
        id          : '6c6b5c5c-97d5-4881-b5e1-e05b8f739ee7',
        iso         : 'al',
        name        : 'Albania',
        code        : '+355',
        flagImagePos: '-1px -1310px'
    },
    {
        id          : 'd1f3941f-075e-4777-a5fd-8b196d98cd5a',
        iso         : 'dz',
        name        : 'Algeria',
        code        : '+213',
        flagImagePos: '-1px -681px'
    },
    {
        id          : '0dc3d1b8-f7f3-4c3d-8493-0d8b5a679910',
        iso         : 'as',
        name        : 'American Samoa',
        code        : '+1',
        flagImagePos: '-1px -2058px'
    },
]; */
export const clubes = [
    {
        id: 'c31e9e5d-e0cb-4574-a13f-8a6ee5ff8309',
        title: 'Ecoart'
    },
    {
        id: 'a8991c76-2fda-4bbd-a718-df13d6478847',
        title: 'Programación'
    },
    {
        id: '56ddbd47-4078-4ddd-8448-73c5e88d5f59',
        title: 'Robótica'
    },
    {
        id: '2026ce08-d08f-4b4f-9506-b10cdb5b104f',
        title: 'Camaleón'
    },
    {
        id: '65930b5a-5d2a-4303-b11f-865d69e6fdb5',
        title: 'Periodismo'
    },
    {
        id: '3eaab175-ec0d-4db7-bc3b-efc633c769be',
        title: 'Debate'
    },
    {
        id: 'cbde2486-5033-4e09-838e-e901b108cd41',
        title: 'Bienestar Animal'
    }
];
export const roles = [
    {
        label: 'Líder Estudiantil',
        value: 'lider estudiantil',
        description: 'Visualiza a los participantes y actividades del club, así como también la exportación de dichos datos.'
    },
    {
        label: 'Docente-Tutor',
        value: 'docente-tutor',
        description: 'Visualiza, crea, modifica y elimina a los participantes del club. Desarrolla las actividades de acuerdo con el plan de trabajo del club.'
    },
    {
        label: 'Dirigente',
        value: 'dirigente',
        description: 'Visualiza a todos los participantes y actividades; por otro lado, visualiza, crea, modifica y elimina a los clubes, asímismo a los usuarios. Elabora informes periódicos de los resultados obtenidos de los clubes.'
    }
];
