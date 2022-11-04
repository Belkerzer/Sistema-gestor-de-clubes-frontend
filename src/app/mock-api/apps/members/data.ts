import moment from 'moment';
import 'app/moment.es.ts';
moment.locale('es');

/* eslint-disable */
export const periodos = [
    {
        id: 'b899ec30-b85a-40ab-bb1f-18a596d5c6de',
        parentId: null,
        name: 'Intensivo 1',
        slug: 'intensivo-1'
    },
    {
        id: '07986d93-d4eb-4de1-9448-2538407f7254',
        parentId: null,
        name: 'Intensivo 2',
        slug: 'intensivo-2'
    },
    {
        id: 'ad12aa94-3863-47f8-acab-a638ef02a3e9',
        parentId: null,
        name: 'Semestre 1',
        slug: 'semestre-1'
    },
    {
        id: 'ad12aa94-3863-47f8-acab-a638ef02a3e0',
        parentId: null,
        name: 'Semestre 2',
        slug: 'semestre-2'
    },
    {
        id: 'ad12aa94-3863-47f8-acab-a638ef02a3e4',
        parentId: null,
        name: 'Trimestre 1',
        slug: 'trimestre-1'
    },
    {
        id: 'ad12aa94-3863-47f8-acab-a638ef02a3e7',
        parentId: null,
        name: 'Trimestre 2',
        slug: 'trimestre-2'
    }
];
export const carreras = [
    {
        id: 'e1789f32-9475-43e7-9256-451d2e3a2282',
        name: 'Atención Prehospitalaria y Emergencias',
        slug: 'atencion-prehospitalaria-y-emergencias'
    },
    {
        id: '61d52c2a-8947-4a2c-8c35-f36baef45b96',
        name: 'Enfermería',
        slug: 'enfermeria'
    },
    {
        id: 'f9987124-7ada-4b93-bef7-35280b3ddbd7',
        name: 'Fisioterapia',
        slug: 'fisioterapia'
    },
    {
        id: '5913ee46-a497-41db-a118-ee506011529f',
        name: 'Gerontología',
        slug: 'gerontologia'
    },
    {
        id: '2c4d98d8-f334-4125-9596-862515f5526b',
        name: 'Medicina',
        slug: 'medicina'
    }
];
export const clubes = [
    {
        id: '167190fa-51b4-45fc-a742-8ce1b33d24ea',
        title: 'Ecoart'
    },
    {
        id: '3baea410-a7d6-4916-b79a-bdce50c37f95',
        title: 'Programación'
    },
    {
        id: '8ec8f60d-552f-4216-9f11-462b95b1d306',
        title: 'Debate'
    },
    {
        id: '8837b93f-388b-43cc-851d-4ca8f23f3a61',
        title: 'Periodismo'
    },
    {
        id: '8f868ddb-d4a2-461d-bc3b-d7c8668687c3',
        title: 'Fotografía'
    }
];
export const sexos = [
    {
        id: '987dd10a-43b1-49f9-bfd9-05bb2dbc7029',
        name: 'Hombre',
        slug: 'hombre'
    },
    {
        id: '998b0c07-abfd-4ba3-8de1-7563ef3c4d57',
        name: 'Mujer',
        slug: 'mujer'
    }
];
export const participantes = [
    {
        id: '7eb7c859-1347-4317-96b6-9476a7e2ba3c',
        periodo: 'b899ec30-b85a-40ab-bb1f-18a596d5c6de',
        name: 'Gabino Holando Arredondo Reynoso',
        observacion: 'Consequat esse in culpa commodo anim. Et ullamco anim amet est. Sunt dolore ex occaecat officia anim. In sit minim laborum nostrud. Consequat ex do velit voluptate do exercitation est adipisicing quis velit.',
        clubes: [
            '167190fa-51b4-45fc-a742-8ce1b33d24ea',
            '7d6dd47e-7472-4f8b-93d4-46c114c44533',
            '8837b93f-388b-43cc-851d-4ca8f23f3a61',
            '2300ac48-f268-466a-b765-8b878b6e14a7',
            'b1286f3a-e2d0-4237-882b-f0efc0819ec3'
        ],
        codigo: '2020441468',
        cedula: '0773484322',
        carrera: 'Atención Prehospitalaria y Emergencias',
        sexo: '987dd10a-43b1-49f9-bfd9-05bb2dbc7029',
        integracion: moment().startOf('day').subtract(15, 'days').format('LL'),
        correoElectronico: 'garredondo@est.ecotec.edu.ec',
        fechaNacimiento: '1977-11-06T12:00:00.000Z',
        /* basePrice: 1036,
        taxPercent: 30,
        price: 'Administración de Empresas',
        weight: 0.61,
        thumbnail: 'assets/images/apps/ecommerce/products/watch-01-thumb.jpg',
        images: [
            'assets/images/apps/ecommerce/products/watch-01-01.jpg',
            'assets/images/apps/ecommerce/products/watch-01-02.jpg',
            'assets/images/apps/ecommerce/products/watch-01-03.jpg'
        ], */
        active: true
    },
    {
        id: '00b0292f-3d50-4669-a0c4-7a9d85efc98d',
        periodo: '07986d93-d4eb-4de1-9448-2538407f7254',
        name: 'Glady Wilma Sotelo Ortiz',
        observacion: 'Nulla duis dolor fugiat culpa proident. Duis anim est excepteur occaecat adipisicing occaecat. Labore id laborum non elit proident est veniam officia eu. Labore aliqua nisi duis sint ex consequat nostrud excepteur duis ex incididunt adipisicing.',
        clubes: [
            '3baea410-a7d6-4916-b79a-bdce50c37f95',
            '7d6dd47e-7472-4f8b-93d4-46c114c44533',
            '8f868ddb-d4a2-461d-bc3b-d7c8668687c3',
            '0b11b742-3125-4d75-9a6f-84af7fde1969',
            'b1286f3a-e2d0-4237-882b-f0efc0819ec3'
        ],
        codigo: '2020353423',
        cedula: '0527243069',
        carrera: 'Enfermería',
        sexo: '998b0c07-abfd-4ba3-8de1-7563ef3c4d57',
        integracion: moment().startOf('day').subtract(15, 'days').format('LL'),
        correoElectronico: 'gsotelo@est.ecotec.edu.ec',
        fechaNacimiento: '1977-11-06T12:00:00.000Z',
        /* basePrice: 1686,
        taxPercent: 30,
        price: 'Psicología Clínica',
        weight: 0.79,
        thumbnail: 'assets/images/apps/ecommerce/products/watch-02-thumb.jpg',
        images: [
            'assets/images/apps/ecommerce/products/watch-02-01.jpg',
            'assets/images/apps/ecommerce/products/watch-02-02.jpg',
            'assets/images/apps/ecommerce/products/watch-02-03.jpg'
        ], */
        active: true
    },
    {
        id: '3f34e2fb-95bf-4f61-be28-956d2c7e4eb2',
        periodo: 'b899ec30-b85a-40ab-bb1f-18a596d5c6de',
        name: 'Salvo Samuel Roman Tenorio',
        observacion: 'Velit irure deserunt aliqua officia. Eiusmod quis sunt magna laboris aliquip non dolor consequat cupidatat dolore esse. Consectetur mollit officia laborum fugiat nulla duis ad excepteur do aliqua fugiat. Fugiat non laboris exercitation ipsum in incididunt.',
        clubes: [
            '167190fa-51b4-45fc-a742-8ce1b33d24ea',
            '0fc39efd-f640-41f8-95a5-3f1d749df200',
            '8837b93f-388b-43cc-851d-4ca8f23f3a61',
            '2300ac48-f268-466a-b765-8b878b6e14a7',
            'b1286f3a-e2d0-4237-882b-f0efc0819ec3'
        ],
        codigo: '2020220971',
        cedula: '1276453644',
        carrera: 'Fisioterapia',
        sexo: '987dd10a-43b1-49f9-bfd9-05bb2dbc7029',
        integracion: moment().startOf('day').subtract(15, 'days').format('LL'),
        correoElectronico: 'sroman@est.ecotec.edu.ec',
        fechaNacimiento: '1977-11-06T12:00:00.000Z',
        /* basePrice: 950,
        taxPercent: 10,
        price: 'Sistemas Inteligentes',
        weight: 0.76,
        thumbnail: null,
        images: [
            'assets/images/apps/ecommerce/products/watch-03-01.jpg',
            'assets/images/apps/ecommerce/products/watch-03-02.jpg',
            'assets/images/apps/ecommerce/products/watch-03-03.jpg'
        ], */
        active: false,
        facultad: 'e1789f32-9475-43e7-9256-451d2e3a2282'
    },
    {
        id: '8fcce528-d878-4cc8-99f7-bd3451ed5405',
        periodo: 'b899ec30-b85a-40ab-bb1f-18a596d5c6de',
        name: 'Vivian Olinda Alonzo Barreto',
        observacion: 'Velit nisi proident cupidatat exercitation occaecat et adipisicing nostrud id ex nostrud sint. Qui fugiat velit minim amet reprehenderit voluptate velit exercitation proident Lorem nisi culpa. Commodo quis officia officia eiusmod mollit aute fugiat duis quis minim culpa in. Exercitation laborum fugiat ex excepteur officia reprehenderit magna ipsum. Laboris dolore nostrud id labore sint consectetur aliqua tempor ea aute do.',
        clubes: [
            '167190fa-51b4-45fc-a742-8ce1b33d24ea',
            '7d6dd47e-7472-4f8b-93d4-46c114c44533',
            '8837b93f-388b-43cc-851d-4ca8f23f3a61',
            '0b11b742-3125-4d75-9a6f-84af7fde1969',
            'b1286f3a-e2d0-4237-882b-f0efc0819ec3'
        ],
        codigo: '2020173717',
        cedula: '0837861971',
        carrera: 'Gerontología',
        sexo: '998b0c07-abfd-4ba3-8de1-7563ef3c4d57',
        integracion: moment().startOf('day').subtract(15, 'days').format('LL'),
        correoElectronico: 'valonzo@est.ecotec.edu.ec',
        fechaNacimiento: '1977-11-06T12:00:00.000Z',
        /* basePrice: 839,
        taxPercent: 30,
        price: 'Mercadotecnia',
        weight: 0.62,
        thumbnail: 'assets/images/apps/ecommerce/products/watch-04-thumb.jpg',
        images: [
            'assets/images/apps/ecommerce/products/watch-04-01.jpg',
            'assets/images/apps/ecommerce/products/watch-04-02.jpg',
            'assets/images/apps/ecommerce/products/watch-04-03.jpg'
        ], */
        active: true
    },
    {
        id: 'd7d1d6df-e91f-4c53-982a-2720bc2b4cdd',
        periodo: 'ad12aa94-3863-47f8-acab-a638ef02a3e9',
        name: 'Carlos Miguel Vargas Castro',
        observacion: 'Voluptate consectetur nisi aliquip cupidatat sunt labore. Adipisicing voluptate tempor sunt eu irure cupidatat laboris. Enim aliquip aute sit non laborum Lorem in enim duis eu deserunt. Laboris magna irure aute ut proident fugiat laborum aliquip tempor nostrud id. Et esse cupidatat sunt ullamco reprehenderit enim dolore ea in do esse esse id.',
        clubes: [
            '8ec8f60d-552f-4216-9f11-462b95b1d306',
            '0fc39efd-f640-41f8-95a5-3f1d749df200',
            '8f868ddb-d4a2-461d-bc3b-d7c8668687c3',
            '0b11b742-3125-4d75-9a6f-84af7fde1969',
            'b1286f3a-e2d0-4237-882b-f0efc0819ec3'
        ],
        codigo: '2020521367',
        cedula: '2027742972',
        carrera: 'Medicina',
        sexo: '987dd10a-43b1-49f9-bfd9-05bb2dbc7029',
        integracion: moment().startOf('day').subtract(15, 'days').format('LL'),
        correoElectronico: 'cvargas@est.ecotec.edu.ec',
        fechaNacimiento: '1977-11-06T12:00:00.000Z',
        /* basePrice: 1213,
        taxPercent: 10,
        price: 'Psicología',
        weight: 0.75,
        thumbnail: 'assets/images/apps/ecommerce/products/watch-23-thumb.jpg',
        images: [
            'assets/images/apps/ecommerce/products/watch-23-01.jpg',
            'assets/images/apps/ecommerce/products/watch-23-02.jpg',
            'assets/images/apps/ecommerce/products/watch-23-03.jpg'
        ], */
        active: true
    }
];
export const facultades = [
    {
        id: 'e1789f32-9475-43e7-9256-451d2e3a2282',
        name: 'Ciencias de la Salud y Desarrollo Humano',
        slug: 'ciencias-de-la-salud-y-desarrollo-humano'
    },
    {
        id: '61d52c2a-8947-4a2c-8c35-f36baef45b96',
        name: 'Ciencias Económicas y Empresariales',
        slug: 'ciencias-economicas-y-empresariales'
    },
    {
        id: 'f9987124-7ada-4b93-bef7-35280b3ddbd7',
        name: 'Derecho y Gobernabilidad',
        slug: 'derecho-y-gobernalidad'
    },
    {
        id: '5913ee46-a497-41db-a118-ee506011529f',
        name: 'Estudios Globales y Hospitalidad',
        slug: 'estudios-globales-y-hospitalidad'
    },
    {
        id: '2c4d98d8-f334-4125-9596-862515f5526b',
        name: 'Ingenierías',
        slug: 'ingenierias'
    },
    {
        id: '2c4d98d8-f334-4125-9596-862515f5526r',
        name: 'Marketing y Comunicación',
        slug: 'marketing-y-comunicacion'
    }
];