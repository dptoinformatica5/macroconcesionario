const placeholderImage = "data:image/png;base64,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";

export default placeholderImage;