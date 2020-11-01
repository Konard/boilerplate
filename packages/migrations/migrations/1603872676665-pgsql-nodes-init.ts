import hasura, { sql } from '../imports/hasura';

const ntn = process.env.NODES__TABLE_NAME || 'nodes';
const nsn = process.env.NODES__SCHEMA_NAME || 'public';

const UP = sql`
CREATE TABLE ${nsn}."${ntn}" (
  id integer,
  from_id integer,
  to_id integer,
  type_id integer
);
CREATE SEQUENCE public.${ntn}_id_seq
AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;
ALTER SEQUENCE public.${ntn}_id_seq OWNED BY public.${ntn}.id;
ALTER TABLE ONLY public.${ntn} ALTER COLUMN id SET DEFAULT nextval('public.${ntn}_id_seq'::regclass);
`;

const DOWN = `DROP TABLE ${nsn}."${ntn}";`;

export const up = async () => {
  await hasura.sql(UP);
};

export const down = async () => {
  await hasura.sql(DOWN);
};