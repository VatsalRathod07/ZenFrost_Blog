import moment from 'moment'
import React from 'react'

const PostDetail = ({ post }) => {

    const getContentFragment = (index, text, obj, type) => {
        let modifiedText = text;
    
        if (obj) {
          if (obj.bold) {
            modifiedText = (<b key={index}>{text}</b>);
          }
    
          if (obj.italic) {
            modifiedText = (<em key={index}>{text}</em>);
          }
    
          if (obj.underline) {
            modifiedText = (<u key={index}>{text}</u>);
          }
        }
    
        switch (type) {
          case 'heading-three':
            return <h3 key={index} className="text-xl font-semibold  mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
          case 'paragraph':
            return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
          case 'heading-four':
            return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
          case 'image':
            return (
              <img
                key={index}
                alt={obj.title}
                height={obj.height}
                width={obj.width}
                src={obj.src}
              />
            );
          default:
            return modifiedText;
        }
      };

    return (
      <div className="rounded-md lg:p-8 pb-12 mb-8">
        <h1 className="text-black mb-8 mt-3 text-4xl tracking-wide text-start font-black">{post.title}</h1>
          {/* Author Details */}
          <div className="flex mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
                    <img
                        src={post.author.photo.url}
                        alt={post.author.name}
                        height="35px"
                        width="35px"
                        className="align-middle rounded-full"
                    />
                    <div className="text-start">
                        <p className="inline align-middle text-ligthblack-0 text-sm font-semibold ml-2">{post.author.name}</p>
                        <p className="text-sm text-ligthblack-0 text-opacity-60 ml-2">
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                        </p>
                    </div>
                </div>
            <div className="relative overflow-hidden shadow-sm mb-6 mt-5">
                <img
                    src={post.featuredImage.url}
                    alt={post.title}
                    className="object-top h-full w-full rounded-lg"
                />
            </div>

            <div className="px-4 lg:px-0">
              
                {post.content.raw.children.map((typeObj, index) => {
                    const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))

                    return getContentFragment(index, children, typeObj, typeObj.type)
                })}
            </div>
        </div>
    )
}

export default PostDetail