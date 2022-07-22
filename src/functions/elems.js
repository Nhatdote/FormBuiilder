import { avatars, uuid } from "./helpers";

const elems = [
  {
    id: "heading",
    label: "Heading",
    desc: "Create a blocked text",
    icon: "FlagIcon",
    settings: {
      content: "This is a heading",
      tag: "h1",
    },
    styles: {
      color: "black",
      align: "left",
      property: "normal",
    },
    component: "HeadingElem",
    component_setting: "HeadingSetting",
  },
  {
    id: "paragraph",
    label: "Paragraph",
    desc: "Create a normal text",
    icon: "MenuAlt1Icon",
    settings: {
      content: "This is a paragraph",
    },
    style: {
      color: "black",
      fontStyle: "normal",
    },
    component: "ParaElem",
    component_setting: "ParaSetting",
  },
  {
    id: "feature",
    label: "Featured",
    desc: "Create a featured",
    icon: "CubeIcon",
    settings: {
      layout: 1,
      image: null,
      title: "This is a featured",
      content: "This is content of featured",
      btnText: "Read more",
      link: null,
    },
    styles: {
      align: "center",
      background: "darkgray",
      boxShadow: null,
      border: null,
      spacing: null,
      padding: 10,
    },
    component: "FeatureElem",
    component_setting: "FeatureSetting",
  },
  {
    id: "list_card",
    label: "List card",
    desc: "List card",
    icon: "ClipboardListIcon",
    settings: {
      fields: ["avatar", "title", "position", "content"],
    },
    items: renderCardItems.call(),
    styles: {
      color: "black",
      property: null,
      align: "center",
      bgColor: "#ffffff",
    },
    component: "ListElem",
    component_setting: "ListSetting",
  },
];

function renderCardItems() {
  return [
    {
      id: uuid(),
      component_setting: "SimpleTextSetting",
      avatar: avatars[1],
      title: "Join",
      position: "CEO",
      child_styles: {},
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    },
    {
      id: uuid(),
      component_setting: "SimpleTextSetting",
      avatar: avatars[2],
      title: "Steve",
      position: "CTO",
      child_styles: {},
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    },
    {
      id: uuid(),
      component_setting: "SimpleTextSetting",
      avatar: null,
      title: "Seven",
      position: "CPO",
      child_styles: {},
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    },
  ];
}

export default elems;
