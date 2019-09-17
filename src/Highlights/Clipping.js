import React, { Component } from "react";
import Thumbnail from "./Thumbnail";
import "./Clipping.scss";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
const Card = ({ children }) => <div className="clipping">{children}</div>;
const Header = ({ children }) => <div className="header">{children}</div>;
const Title = ({ children }) => <span className="title">{children}</span>;
const Favorite = ({ children, active, onClick }) => <span onClick={onClick} className="favorite">
  {active ? <FavoriteIcon style={{ color: 'darkred' }} /> :
    <FavoriteBorderIcon style={{ color: 'darkred' }} />
  }
</span>;
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
      id,
      thumbnailUrl,
      showThumbnail,
      title,
      authors,
      content,
      loc,
      toggleFavorite,
      isInFavorite,
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
          <Favorite active={isInFavorite} onClick={(() => toggleFavorite(id))} />
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
