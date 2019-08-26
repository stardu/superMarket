import { Upload, Icon, message } from 'antd';
import React from 'react';


class Avatar extends React.Component {
        state = {
            loading: false,
        };

        handleChange = info => {
            if (info.file.status === 'uploading') {
                this.setState({ loading: true });
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                this.setState({
                    loading: false,
                })
                if (info.file.response.code === '200') {
                    this.props.getImgUrl(info.file.response.data)
                }
                return;
            }

        };

        render() {
            const uploadButton = ( <
                div >
                <
                Icon type = { this.state.loading ? 'loading' : 'plus' }
                />

                <
                /div>
            );
            const { imageUrl } = this.state;
            return ( <
                Upload name = "img"
                listType = "picture-card"
                className = "avatar-uploader"
                showUploadList = { false }
                action = "/api/upload"
                onChange = { this.handleChange } >
                {
                    imageUrl ? < img src = { imageUrl }
                    alt = "avatar"
                    style = {
                        { width: '100%' } }
                    /> : uploadButton} <
                    /Upload>
                );
            }
        }

        export default Avatar;