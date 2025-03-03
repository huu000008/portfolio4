export type NotionText = {
  plain_text: string;
};

export type NotionProperty = {
  title: { title: NotionText[] };
  used_technology_stack?: { multi_select: { id: string; name: string }[] };
  overview?: { rich_text: NotionText[] };
  team_composition?: { rich_text: NotionText[] };
  due_date?: { date: { end: string } };
};

export type NotionPost = {
  id: string;
  properties: NotionProperty;
};
