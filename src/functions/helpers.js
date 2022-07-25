const uuid = () => (Math.random() + 1).toString(36).substring(7);
const clone = (item) => JSON.parse(JSON.stringify(item));
const _typeof = (item) =>
  Object.prototype.toString.call(item).slice(8, -1).toLowerCase();

const avatars = [
  "https://thumbs.dreamstime.com/b/funny-cartoon-monster-face-vector-square-avatar-halloween-175916751.jpg",
  "https://thumbs.dreamstime.com/b/cute-monster-face-square-avatar-vector-stock-cute-monster-face-square-avatar-114650081.jpg",
  "https://thumbs.dreamstime.com/b/cartoon-monster-face-vector-halloween-happy-monster-square-avatar-funny-monster-mask-blue-design-t-shirt-sticker-print-97157979.jpg",
  "https://previews.123rf.com/images/juristka/juristka1705/juristka170500007/77884667-cartoon-monster-face-vector-halloween-blue-smiling-fairy-tale-avatar-vector-illustration-.jpg",
  "https://as1.ftcdn.net/v2/jpg/01/93/12/70/1000_F_193127021_CH25xxBJmcBtWJ3TS6oK70IHDfI4vNLy.jpg",
  "https://media.istockphoto.com/vectors/cartoon-monster-face-vector-halloween-pink-monster-avatar-vector-id610668770?k=20&m=610668770&s=170667a&w=0&h=QfeALgkZMc6HNRc2P4QvEhCC_TXf_GgMlQ4CT6ghCmk=",
  "https://media.istockphoto.com/vectors/funny-cartoon-monster-face-vector-monster-square-avatar-vector-id1212937699?k=20&m=1212937699&s=170667a&w=0&h=qvoSZ28QKOdtTi74dOgGAw_egmlIBWe66tJxlPCH26A=",
  "https://img.myloview.com/stickers/funny-cartoon-monster-face-vector-monster-square-avatar-400-205411727.jpg",
];

const alignments = [
  { id: "left", label: "Left" },
  { id: "right", label: "Right" },
  { id: "center", label: "Center" },
  { id: "justify", label: "Justify" },
];

export { uuid, clone, _typeof, avatars, alignments };
