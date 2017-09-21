'use strict';

exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/v1/acopios',
    config: {
      auth: false
    },
    handler: async function (request, reply) {

      const database = request.getDb('acopiodb');
      const CollectionCenter = database.getModel('CentroDeAcopio');
      const ResponsableDeCentro = database.getModel('ResponsableDeCentro');

      try {
        const collectionCenterCollection = await CollectionCenter.findAll({
          include: [
            {
              model: ResponsableDeCentro,
              required: true
            }
          ]
        });

        reply(collectionCenterCollection);
      }
      catch (err) {
        console.error(err);
        reply({}).code(500);
      }

    }
  });
  next();
};

exports.register.attributes  = {
  name: 'acopios-get'
};