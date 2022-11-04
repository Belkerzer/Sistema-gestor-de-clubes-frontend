import moment from 'moment';
import 'app/moment.es.ts';
moment.locale('es');

/* eslint-disable */
export const clubesActividades = [
    {
        id: 'b899ec30-b85a-40ab-bb1f-18a596d5c6de',
        parentId: null,
        name: 'Bienestar Animal',
        slug: '1'
    },
    {
        id: '07986d93-d4eb-4de1-9448-2538407f7254',
        parentId: null,
        name: 'Debate',
        slug: '2'
    },
    {
        id: 'ad12aa94-3863-47f8-acab-a638ef02a3e9',
        parentId: null,
        name: 'Programación',
        slug: '3'
    },
    {
        id: 'ad12aa94-3863-47f8-acab-a638ec02a3e9',
        parentId: null,
        name: 'Fotografía',
        slug: '4'
    },
    {
        id: 'ad12aa94-3863-47f8-acab-a618ef02a3e9',
        parentId: null,
        name: 'Ajedrez',
        slug: '5'
    }
];
export const facultadesActividades = [
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
export const participantesActividades = [
    {
        id: '167190fa-51b4-45fc-a742-8ce1b33d24ea',
        title: 'Luis Kenán Quiroz Welter'
    },
    {
        id: '3baea410-a7d6-4916-b79a-bdce50c37f95',
        title: 'Gennaro Jonatan Tellez Delarosa'
    },
    {
        id: '8ec8f60d-552f-4216-9f11-462b95b1d306',
        title: 'Adrián Vincenzo Angulo Soliz'
    },
    {
        id: '8837b93f-388b-43cc-851d-4ca8f23f3a61',
        title: 'Bettina Karina Castillo Tello'
    },
    {
        id: '8f868ddb-d4a2-461d-bc3b-d7c8668687c3',
        title: 'Violeta Hipólita Segura Roberts'
    }
];
export const periodosActividades = [
    {
        id: '987dd10a-43b1-49f9-bfd9-05bb2dbc7029',
        name: 'Semestre 1',
        slug: 'derechos-integridad-e-igualdad'
    }
];
export const activities = [
    {
        id: '7eb7c859-1347-4317-96b6-9476a7e2ba3c',
        clubActividades: 'b899ec30-b85a-40ab-bb1f-18a596d5c6de',
        name: 'Historia del Pasillo / Promover la cultura propia de nuestra urbe costeña.',
        observacion: 'Consequat esse in culpa commodo anim. Et ullamco anim amet est. Sunt dolore ex occaecat officia anim. In sit minim laborum nostrud. Consequat ex do velit voluptate do exercitation est adipisicing quis velit.',
        participantesActividades: [
            '167190fa-51b4-45fc-a742-8ce1b33d24ea',
            '7d6dd47e-7472-4f8b-93d4-46c114c44533',
            '8837b93f-388b-43cc-851d-4ca8f23f3a61',
            '2300ac48-f268-466a-b765-8b878b6e14a7',
            'b1286f3a-e2d0-4237-882b-f0efc0819ec3'
        ],
        /* sku: 'Bienestar Animal',
        barcode: '8346201275534', */
        facultadActividades: '61d52c2a-8947-4a2c-8c35-f36baef45b96',
        programaActividades: '987dd10a-43b1-49f9-bfd9-05bb2dbc7029',
        fechaPlanificacion: moment().startOf('day').subtract(15, 'days').format('LL'),
        horas: 2,
        materiales: '',
        fechaSeguimiento: '1977-11-06T12:00:00.000Z',
        /* taxPercent: 30, */
        lugar: 'Salón Ecotec',
        fechaEstimada: '',
        /* thumbnail: 'assets/images/apps/ecommerce/products/watch-01-thumb.jpg',
        images: [
            'assets/images/apps/ecommerce/products/watch-01-01.jpg',
            'assets/images/apps/ecommerce/products/watch-01-02.jpg',
            'assets/images/apps/ecommerce/products/watch-01-03.jpg'
        ], */
        logro: 14
    },
    {
        id: '00b0292f-3d50-4669-a0c4-7a9d85efc98d',
        clubActividades: '07986d93-d4eb-4de1-9448-2538407f7254',
        name: 'Planificación de actividades a desarrollar en el año.',
        observacion: 'Nulla duis dolor fugiat culpa proident. Duis anim est excepteur occaecat adipisicing occaecat. Labore id laborum non elit proident est veniam officia eu. Labore aliqua nisi duis sint ex consequat nostrud excepteur duis ex incididunt adipisicing.',
        participantesActividades: [
            '3baea410-a7d6-4916-b79a-bdce50c37f95',
            '7d6dd47e-7472-4f8b-93d4-46c114c44533',
            '8f868ddb-d4a2-461d-bc3b-d7c8668687c3',
            '0b11b742-3125-4d75-9a6f-84af7fde1969',
            'b1286f3a-e2d0-4237-882b-f0efc0819ec3'
        ],
        /* sku: 'Debate',
        barcode: '8278968055700', */
        facultadActividades: '2c4d98d8-f334-4125-9596-862515f5526b',
        programaActividades: '987dd10a-43b1-49f9-bfd9-05bb2dbc7029',
        fechaPlanificacion: moment().startOf('day').subtract(15, 'days').format('LL'),
        horas: 2,
        materiales: '',
        fechaSeguimiento: '1977-11-06T12:00:00.000Z',
        /* taxPercent: 30, */
        lugar: 'Salón Ecotec',
        fechaEstimada: '',
        /* thumbnail: 'assets/images/apps/ecommerce/products/watch-02-thumb.jpg',
        images: [
            'assets/images/apps/ecommerce/products/watch-02-01.jpg',
            'assets/images/apps/ecommerce/products/watch-02-02.jpg',
            'assets/images/apps/ecommerce/products/watch-02-03.jpg'
        ], */
        logro: 12
    },
    {
        id: '3f34e2fb-95bf-4f61-be28-956d2c7e4eb2',
        clubActividades: 'b899ec30-b85a-40ab-bb1f-18a596d5c6de',
        name: 'Captar nuevos estudiantes al club.',
        observacion: 'Velit irure deserunt aliqua officia. Eiusmod quis sunt magna laboris aliquip non dolor consequat cupidatat dolore esse. Consectetur mollit officia laborum fugiat nulla duis ad excepteur do aliqua fugiat. Fugiat non laboris exercitation ipsum in incididunt.',
        participantesActividades: [
            '167190fa-51b4-45fc-a742-8ce1b33d24ea',
            '0fc39efd-f640-41f8-95a5-3f1d749df200',
            '8837b93f-388b-43cc-851d-4ca8f23f3a61',
            '2300ac48-f268-466a-b765-8b878b6e14a7',
            'b1286f3a-e2d0-4237-882b-f0efc0819ec3'
        ],
        /* sku: 'Programación',
        barcode: '8808746892183', */
        facultadActividades: 'e1789f32-9475-43e7-9256-451d2e3a2282',
        programaActividades: '987dd10a-43b1-49f9-bfd9-05bb2dbc7029',
        fechaPlanificacion: moment().startOf('day').subtract(15, 'days').format('LL'),
        horas: 2,
        materiales: '',
        fechaSeguimiento: '1977-11-06T12:00:00.000Z',
        /* taxPercent: 10, */
        lugar: 'Salón Ecotec',
        fechaEstimada: '',
        /* thumbnail: null,
        images: [
            'assets/images/apps/ecommerce/products/watch-03-01.jpg',
            'assets/images/apps/ecommerce/products/watch-03-02.jpg',
            'assets/images/apps/ecommerce/products/watch-03-03.jpg'
        ], */
        logro: 10
    },
    {
        id: '8fcce528-d878-4cc8-99f7-bd3451ed5405',
        clubActividades: 'b899ec30-b85a-40ab-bb1f-18a596d5c6de',
        name: 'Concurso interno en línea, realizado por el club de robótica con carros de alta precisión y que sigan un camino virtual.',
        observacion: 'Velit nisi proident cupidatat exercitation occaecat et adipisicing nostrud id ex nostrud sint. Qui fugiat velit minim amet reprehenderit voluptate velit exercitation proident Lorem nisi culpa. Commodo quis officia officia eiusmod mollit aute fugiat duis quis minim culpa in. Exercitation laborum fugiat ex excepteur officia reprehenderit magna ipsum. Laboris dolore nostrud id labore sint consectetur aliqua tempor ea aute do.',
        participantesActividades: [
            '167190fa-51b4-45fc-a742-8ce1b33d24ea',
            '7d6dd47e-7472-4f8b-93d4-46c114c44533',
            '8837b93f-388b-43cc-851d-4ca8f23f3a61',
            '0b11b742-3125-4d75-9a6f-84af7fde1969',
            'b1286f3a-e2d0-4237-882b-f0efc0819ec3'
        ],
        /* sku: 'Fotografía',
        barcode: '8866355574164', */
        facultadActividades: '61d52c2a-8947-4a2c-8c35-f36baef45b96',
        programaActividades: '987dd10a-43b1-49f9-bfd9-05bb2dbc7029',
        fechaPlanificacion: moment().startOf('day').subtract(15, 'days').format('LL'),
        horas: 2,
        materiales: '',
        fechaSeguimiento: '1977-11-06T12:00:00.000Z',
        /* taxPercent: 30, */
        lugar: 'Salón Ecotec',
        fechaEstimada: '',
        /* thumbnail: 'assets/images/apps/ecommerce/products/watch-04-thumb.jpg',
        images: [
            'assets/images/apps/ecommerce/products/watch-04-01.jpg',
            'assets/images/apps/ecommerce/products/watch-04-02.jpg',
            'assets/images/apps/ecommerce/products/watch-04-03.jpg'
        ], */
        logro: 25
    },
    {
        id: 'd7d1d6df-e91f-4c53-982a-2720bc2b4cdd',
        clubActividades: 'ad12aa94-3863-47f8-acab-a638ef02a3e9',
        name: 'Elaboración del logo del club.',
        observacion: 'Voluptate consectetur nisi aliquip cupidatat sunt labore. Adipisicing voluptate tempor sunt eu irure cupidatat laboris. Enim aliquip aute sit non laborum Lorem in enim duis eu deserunt. Laboris magna irure aute ut proident fugiat laborum aliquip tempor nostrud id. Et esse cupidatat sunt ullamco reprehenderit enim dolore ea in do esse esse id.',
        participantesActividades: [
            '8ec8f60d-552f-4216-9f11-462b95b1d306',
            '0fc39efd-f640-41f8-95a5-3f1d749df200',
            '8f868ddb-d4a2-461d-bc3b-d7c8668687c3',
            '0b11b742-3125-4d75-9a6f-84af7fde1969',
            'b1286f3a-e2d0-4237-882b-f0efc0819ec3'
        ],
        /* sku: 'Ajedrez',
        barcode: '8545771786193', */
        facultadActividades: '61d52c2a-8947-4a2c-8c35-f36baef45b96',
        programaActividades: '987dd10a-43b1-49f9-bfd9-05bb2dbc7029',
        fechaPlanificacion: moment().startOf('day').subtract(15, 'days').format('LL'),
        horas: 2,
        materiales: '',
        fechaSeguimiento: '1977-11-06T12:00:00.000Z',
        /* taxPercent: 10, */
        lugar: 'Salón Ecotec',
        fechaEstimada: '',
        /* thumbnail: 'assets/images/apps/ecommerce/products/watch-23-thumb.jpg',
        images: [
            'assets/images/apps/ecommerce/products/watch-23-01.jpg',
            'assets/images/apps/ecommerce/products/watch-23-02.jpg',
            'assets/images/apps/ecommerce/products/watch-23-03.jpg'
        ], */
        logro: 10
    }
];
