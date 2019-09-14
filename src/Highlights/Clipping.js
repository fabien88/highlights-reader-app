import React, { Component } from "react";
import Thumbnail from "./Thumbnail";
import "./Clipping.scss";

const Card = ({ children }) => <div className="clipping">{children}</div>;
const Header = ({ children }) => <div className="header">{children}</div>;
const Title = ({ children }) => <span className="title">{children}</span>;
const Author = ({ children }) => <span className="author">by {children}</span>;

const Separator = () => <div className="separator" />;

const Content = ({ children }) => <div className="content">{children}</div>;
const Location = ({ children }) => (
  <span className="location">(Location {children})</span>
);

class Clipping extends Component {
  shouldComponentUpdate(nextProps) {
    return !(
      nextProps.id === this.props.id &&
      nextProps.showThumbnail === this.props.showThumbnail
    );
  }

  render() {
    const {
      thumbnailUrl,
      showThumbnail,
      title,
      authors,
      content,
      loc
    } = this.props;
    return (
      <Card>
        <Header>
          <Thumbnail
            thumbnailUrl={thumbnailUrl}
            title={title}
            author={authors[0]}
          />
          <Title>
            {title}
            <Author>{authors[0]}</Author>
          </Title>
          <Separator />
        </Header>
        <Content>
          {content}
          <Location>{loc.split("-")[0]}</Location>
        </Content>
      </Card>
    );
  }
}
export default Clipping;
