import hasura from '../imports/hasura';

const ntn = process.env.NODES__TABLE_NAME || 'nodes';
const nsn = process.env.NODES__SCHEMA_NAME || 'public';

export const up = async () => {
  await hasura.post({
    type: 'create_object_relationship',
    args: {
      table: ntn,
      name: 'from',
      using: {
        manual_configuration: {
          remote_table: {
            schema: 'public',
            name: 'nodes',
          },
          column_mapping: {
            from_id: 'id',
          },
        },
      },
    },
  });

  await hasura.post({
    type: 'create_object_relationship',
    args: {
      table: ntn,
      name: 'to',
      using: {
        manual_configuration: {
          remote_table: {
            schema: 'public',
            name: 'nodes',
          },
          column_mapping: {
            to_id: 'id',
          },
        },
      },
    },
  });

  await hasura.post({
    type: 'create_object_relationship',
    args: {
      table: ntn,
      name: 'type',
      using: {
        manual_configuration: {
          remote_table: {
            schema: 'public',
            name: 'nodes',
          },
          column_mapping: {
            type_id: 'id',
          },
        },
      },
    },
  });

  await hasura.post({
    type: 'create_array_relationship',
    args: {
      table: ntn,
      name: 'in',
      using: {
        manual_configuration: {
          remote_table: {
            schema: 'public',
            name: 'nodes',
          },
          column_mapping: {
            id: 'to_id',
          },
        },
      },
    },
  });

  await hasura.post({
    type: 'create_array_relationship',
    args: {
      table: ntn,
      name: 'out',
      using: {
        manual_configuration: {
          remote_table: {
            schema: 'public',
            name: 'nodes',
          },
          column_mapping: {
            id: 'from_id',
          },
        },
      },
    },
  });
};

export const down = async () => {
  await hasura.post({
    type: 'drop_relationship',
    args: {
      table: ntn,
      relationship: 'from',
    },
  });
  await hasura.post({
    type: 'drop_relationship',
    args: {
      table: ntn,
      relationship: 'to',
    },
  });
  await hasura.post({
    type: 'drop_relationship',
    args: {
      table: ntn,
      relationship: 'type',
    },
  });
  await hasura.post({
    type: 'drop_relationship',
    args: {
      table: ntn,
      relationship: 'in',
    },
  });
  await hasura.post({
    type: 'drop_relationship',
    args: {
      table: ntn,
      relationship: 'out',
    },
  });
};