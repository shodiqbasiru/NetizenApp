import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import avatar from "../../../assets/img/user.jpg";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Feed } from "../../../types/feed";
import { createFeed, getFeeds, updateFeed } from "../../../usecase/usecase-feeds";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router";

function FeedForm({ onAddFeed }: { onAddFeed?: (feed: Feed) => void }) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [imgUri, setImgUri] = useState("");
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (id) {
      const feeds = getFeeds();
      const feed = feeds.find((feed) => feed.id === id);
      if (feed) {
        setTitle(feed.title || "");
        setSubTitle(feed.subTitle || "");
        setImgUri(feed.imgUri || "");
        setContent(feed.content || "");
        setVisible(true);
      }
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    const newFeed: Feed = {
      title,
      subTitle,
      imgUri,
      content,
      postDate: new Date().toISOString(),
      userId: JSON.parse(userId || ""),
    };

    if (id) {
      updateFeed(newFeed);
    } else {
      createFeed(newFeed);
      if (onAddFeed) {
        onAddFeed(newFeed);
      }
    }

    setTitle("");
    setSubTitle("");
    setImgUri("");
    setContent("");
    setVisible(false);
    navigate("/feeds");
  };

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <h2 className="text-2xl font-bold font-rajdhani text-indigo-700">
        {id ? "Edit Feed" : "Create a new feed"}
      </h2>
    </div>
  );

  return (
    <Card className="bg-slate-50 shadow-sm rounded-xl mb-8 p-0">
      {!id && (
        <div className="flex justify-between flex-col p-0">
          <h2 className="text-2xl font-bold font-rajdhani text-indigo-700 mb-4">
            What's on your mind?
          </h2>
          <div className="flex">
            <Image
              alt="Avatar"
              src={avatar}
              className="w-16 h-16 rounded-full mr-3 bg-slate-50 shadow-sm p-1"
            />
            <Button
              label="Start a new feed"
              className="text-lg font-normal text-black mb-4 font-public-sans bg-transparent border border-black w-full text-start rounded-3xl hover:bg-indigo-700/50 hover:border-indigo-700 
            outline-none focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
              onClick={() => setVisible(true)}
            />
          </div>
        </div>
      )}
      <Dialog
        visible={visible}
        modal
        header={headerElement}
        style={{ width: "50rem" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
          navigate("/feeds");
        }}
      >
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                className="inline-block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <div className="p-inputgroup flex-1">
                <InputText
                  placeholder="Enter your title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <span className="p-inputgroup-addon">
                  <i className="pi pi-book"></i>
                </span>
              </div>
            </div>
            <div className="mb-4">
              <label
                className="inline-block text-gray-700 text-sm font-bold mb-2"
                htmlFor="subtitle"
              >
                Subtitle
              </label>
              <div className="p-inputgroup flex-1">
                <InputText
                  placeholder="Enter your subtitle"
                  type="text"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                />
                <span className="p-inputgroup-addon">
                  <i className="pi pi-book"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="inline-block text-gray-700 text-sm font-bold mb-2"
              htmlFor="imgUri"
            >
              Image URL
            </label>
            <div className="p-inputgroup flex-1">
              <InputText
                placeholder="Enter your image URL"
                type="text"
                value={imgUri}
                onChange={(e) => setImgUri(e.target.value)}
              />
              <span className="p-inputgroup-addon">
                <i className="pi pi-image"></i>
              </span>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <InputTextarea
              autoResize
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              cols={30}
              className="w-full"
            />
          </div>
          <div>
            <Button label="Submit" type="submit" icon="pi pi-send" autoFocus />
          </div>
        </form>
      </Dialog>
    </Card>
  );
}

export default FeedForm;

FeedForm.proptypes = {
  onAddFeed: PropTypes.func,
};
