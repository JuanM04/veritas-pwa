const STATIC_DATA = require('utils/static-data.json')

const toModule = (day, ssmNumber, professor=false) => {
  const ssmInfo = STATIC_DATA.ssm
  let newModule = {
    day,
    ...ssmInfo[ssmNumber.toString()]
  }

  if(professor) newModule.professor = professor

  return newModule
}





const DATA = {
  classroom: [
    {
      subject_id:     '92b70bfc-c801-48ba-bfdf-2c0de73a9515',   // Literatura
      professors_ids: [ '03f9f864-9533-43d6-a246-7428fe025138' ],
      modules:        [ toModule('TUE',11), toModule('THU',12) ]
    },
    {
      subject_id:     '761649a3-6e76-4b92-935a-5ee145b0c02f',   // Matemáticas
      professors_ids: [ 'e0e90739-79b5-421c-9672-a40b51883888' ],
      modules:        [ toModule('MON',12), toModule('WED',11), toModule('WED',12), toModule('THU',14) ]
    },
    {
      subject_id:     '2499feb0-20e4-4273-b860-f743b5ec9806',   // Inglés
      professors_ids: [ '0e117b16-c656-4241-b5c9-f6efebc5c6ca' ],
      modules:        [ toModule('THU',13), toModule('FRI',12) ]
    },
    {
      subject_id:     '79be1234-7244-4052-b8d2-5bbd434fa2f7',   // Salud y Adolescencia
      professors_ids: [ 'fb2d1337-b4bc-40e9-88db-06e6544f79a7' ],
      modules:        [ toModule('TUE',14), toModule('WED',14) ]
    },
    {
      subject_id:     'd427a401-613e-4ed3-b221-5cdbe9d08c6a',   // Materiales
      professors_ids: [ '800cd3c3-1949-4613-a22a-c7f88f08ffd7' ],
      modules:        [ toModule('TUE',12), toModule('FRI',13) ]
    },
    {
      subject_id:     'a5bdc8e0-2c11-426c-8263-5241b2bf0449',   // Física
      professors_ids: [ '656de903-7b9e-429b-81dd-bdbd7aa7a7e2' ],
      modules:        [ toModule('MON',11), toModule('WED',13), toModule('THU',11) ]
    },
    {
      subject_id:     'ef532e47-c39e-4aa5-90df-b653bc18d91a',   // Química
      professors_ids: [ '00657924-9c61-4a16-bd19-eb4318d73e30' ],
      modules:        [ toModule('TUE',13), toModule('WED',15) ]
    },
    {
      subject_id:     'caed69aa-fc7e-49ac-b586-ca00d7a0fb72',   // Geografía
      professors_ids: [ 'fd932c06-35f0-48dc-a8a7-2ac9528fb20c' ],
      modules:        [ toModule('MON',14), toModule('FRI',14) ]
    },
    {
      subject_id:     'f7114b81-1290-415a-97b2-eb9e7a96afe6',   // Historia
      professors_ids: [ 'b7aa7687-3aba-4a42-a0fc-e654e18a62a7' ],
      modules:        [ toModule('MON',13), toModule('FRI',11) ]
    },
    {
      subject_id:     'f6c9573f-56f2-4fe2-b022-ecd247bc5557',   // Educación Física
      professors_ids: [ 'c9d3f007-8cdb-4535-b936-e3f6b33e6da1' ],
      modules:        [ { day: 'TUE', start_time: '15:35', end_time: '17:35' } ]
    },
  ],



  group2: [
    {
      subject_id:     'b1875406-31ce-4d54-8f33-6731d27264f0',     // Instalación y Aplicación de la Energía
      professors_ids: [ '218cd909-e85d-4904-b307-dbae8fa82cfb', '9109696b-b597-4e6e-b78e-7f7155563d49' ],
      modules:        [ toModule('WED',32,0), toModule('FRI',23,1), toModule('FRI',24,1) ]
    },
    {
      subject_id:     'f5357a6b-2600-4b31-8346-9b09a9da5ebd',     // Dibujo Tecnológico
      professors_ids: [ '2925dfb8-20bf-4cd7-8cf7-d6fcf88bff9d' ],
      modules:        [ toModule('TUE',21), toModule('TUE',22) ]
    },
    {
      subject_id:     '547c2179-6a7a-40e2-a60e-85bfa3f35cfa',     // Dibujo y Procesamiento Mecánico
      professors_ids: [ 'f32ecc97-95dd-4f44-9783-6887bbabc6af' ],
      modules:        [ toModule('MON',21), toModule('MON',22), toModule('MON',23), toModule('MON',24) ]
    },
    {
      subject_id:     'aa80aaba-25c3-436f-8937-0a180b4319b9',     // Máquinas Eléctricas I
      professors_ids: [ '1958b5a9-6fd4-47cd-b617-6169008258cd', '9109696b-b597-4e6e-b78e-7f7155563d49' ],
      modules:        [ toModule('WED',31,0), toModule('FRI',21,1), toModule('FRI',22,1) ]
    },
  ],

  group3: [
    {
      subject_id:     'b1875406-31ce-4d54-8f33-6731d27264f0',     // Instalación y Aplicación de la Energía
      professors_ids: [ '218cd909-e85d-4904-b307-dbae8fa82cfb' ],
      modules:        [ toModule('MON',21), toModule('MON',22), toModule('MON',23), toModule('MON',24) ]
    },
    {
      subject_id:     'f5357a6b-2600-4b31-8346-9b09a9da5ebd',     // Dibujo Tecnológico
      professors_ids: [ 'f32ecc97-95dd-4f44-9783-6887bbabc6af' ],
      modules:        [ toModule('TUE',21), toModule('TUE',22) ]
    },
    {
      subject_id:     '547c2179-6a7a-40e2-a60e-85bfa3f35cfa',     // Dibujo y Procesamiento Mecánico
      professors_ids: [ 'e69aab35-09f0-4cda-ba68-3e912593d433' ],
      modules:        [ toModule('WED',31), toModule('WED',32) ]
    },
    {
      subject_id:     'aa80aaba-25c3-436f-8937-0a180b4319b9',     // Máquinas Eléctricas I
      professors_ids: [ '9109696b-b597-4e6e-b78e-7f7155563d49', '1958b5a9-6fd4-47cd-b617-6169008258cd' ],
      modules:        [ toModule('THU',21,0), toModule('THU',22,0), toModule('THU',23,1), toModule('THU',24,1) ]
    },
  ],

  group7: [
    {
      subject_id:     'b1875406-31ce-4d54-8f33-6731d27264f0',     // Instalación y Aplicación de la Energía
      professors_ids: [ '218cd909-e85d-4904-b307-dbae8fa82cfb' ],
      modules:        [ toModule('MON',31), toModule('THU',32) ]
    },
    {
      subject_id:     'f5357a6b-2600-4b31-8346-9b09a9da5ebd',     // Dibujo Tecnológico
      professors_ids: [ '70a0937d-64b1-42f1-9970-ea620ec0238a' ],
      modules:        [ toModule('THU',31) ]
    },
    {
      subject_id:     '547c2179-6a7a-40e2-a60e-85bfa3f35cfa',     // Dibujo y Procesamiento Mecánico
      professors_ids: [ '25fc7b48-6ef7-4803-8632-a2449f6b3ccd', '61afd135-9502-407a-86d0-0dc74558b84d' ],
      modules:        [ toModule('WED',23,0), toModule('WED',24,0), toModule('FRI',23,1), toModule('FRI',24,1) ]
    },
    {
      subject_id:     'aa80aaba-25c3-436f-8937-0a180b4319b9',     // Máquinas Eléctricas I
      professors_ids: [ '1958b5a9-6fd4-47cd-b617-6169008258cd', '00118229-2d0c-43b9-97e4-bc496fe3db5b' ],
      modules:        [ toModule('MON',31,0), toModule('FRI',21,1), toModule('FRI',22,1) ]
    },
  ],
}





module.exports = (join=false) => {
  if(!join) return DATA

  const findById = (arr, id) => arr.find(obj => obj.id === id)

  let joined = {}
  for (const group in DATA) {
    let groupJoined = []
    for (const subject of DATA[group]) {
      groupJoined.push({
        subject: findById(STATIC_DATA.subjects, subject.subject_id),
        professor: subject.professors_ids.map(professor_id => findById(STATIC_DATA.professors, professor_id)),
        modules: subject.modules
      })
    }
    joined[group] = groupJoined
  }
  return joined
}