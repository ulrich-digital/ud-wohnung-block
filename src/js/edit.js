import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from "@wordpress/block-editor";
import { Button, Icon } from "@wordpress/components";
import { close, trash } from "@wordpress/icons";

import UserIcon from "../assets/icons/user-sharp-solid-full.svg";
import PhoneIcon from "../assets/icons/phone-sharp-solid-full.svg";
import MobileIcon from "../assets/icons/mobile-screen-button-sharp-solid-full.svg";
import EnvelopeIcon from "../assets/icons/envelope-sharp-solid-full.svg";
import ExternalLinkIcon from "../assets/icons/arrow-up-right-from-square-sharp-solid-full.svg";
import PdfIcon from "../assets/icons/file-pdf-sharp-solid-full.svg";

export default function Edit({ attributes, setAttributes }) {
	const {
		mediaIds = [],
		mediaUrls = [],
		title,
		text,
		nameAddress,
		phone,
		mobile,
		email,
		url,
		pdf,
		pdfLabel,
	} = attributes;

	const blockProps = useBlockProps({ className: "ud-wohnung-block" });

	const onSelectImages = (images) => {
		const ids = images.map((img) => img.id);
		const urls = images.map((img) => img.url);
		setAttributes({ mediaIds: ids, mediaUrls: urls });
	};

	const onSelectPdf = (file) => {
		setAttributes({ pdf: file.url });
		if (!pdfLabel) {
			setAttributes({ pdfLabel: file.title || file.filename });
		}
	};

	return (
		<div {...blockProps}>
			{/* Galerie */}
			<div className="wohnung-gallery">
<MediaUploadCheck>
    <MediaUpload
        onSelect={onSelectImages}
        allowedTypes={["image"]}
        multiple
        gallery
        value={mediaIds}
        render={({ open }) => (
            <div>
                {mediaUrls.length > 0 ? (
                    <div className="wohnung-gallery-preview">
                        {mediaUrls.map((url, index) => (
                            <div key={index} className="wohnung-gallery-item">
                                <img src={url} alt="" className="wohnung-gallery-thumb" />

<Button
    icon={trash}
    label={__("Entfernen", "ud-wohnung-block-ud")}
    onClick={() => {
        const newIds = [...mediaIds];
        const newUrls = [...mediaUrls];
        newIds.splice(index, 1);
        newUrls.splice(index, 1);
        setAttributes({
            mediaIds: newIds,
            mediaUrls: newUrls,
        });
    }}
    size="small"
    variant="secondary"
    isDestructive
    className="wohnung-gallery-remove"
/>

                            </div>
                        ))}
                    </div>
                ) : (
                    <p>{__("", "ud-wohnung-block-ud")}</p>
                )}

                <div className="wohnung-gallery-actions">
                    <Button onClick={open} variant="secondary">
                        {__("Galerie bearbeiten", "ud-wohnung-block-ud")}
                    </Button>
                    {mediaUrls.length > 0 && (
                        <Button
                            onClick={() =>
                                setAttributes({ mediaIds: [], mediaUrls: [] })
                            }
                            variant="secondary"
    isDestructive

                            className="wohnung-gallery-clear"
                        >
                            {__("Galerie leeren", "ud-wohnung-block-ud")}
                        </Button>
                    )}
                </div>
            </div>
        )}
    />
</MediaUploadCheck>

			</div>

			{/* Titel */}
			<RichText
				tagName="h3"
				value={title}
				onChange={(val) => setAttributes({ title: val })}
				placeholder={__(
					"Name der Wohnung eingeben",
					"ud-wohnung-block-ud"
				)}
				className="wohnung-title"
			/>

			{/* Accordion */}
			<div className="ud-accordion">
				<div className="ud-accordion__title">
					<h3 className="ud-accordion__toggle">
						{__("Details", "ud-wohnung-block-ud")}
					</h3>
					<span className="ud-accordion__icon">
						<i className="fa-sharp fa-solid fa-arrow-right-long"></i>
					</span>
				</div>
				<div className="ud-accordion__content">
					<div className="ud-accordion__content-inner">
						{/* Text */}
						<RichText
							tagName="p"
							value={text}
							onChange={(val) => setAttributes({ text: val })}
							placeholder={__(
								"Beschreibung zur Wohnung eingeben",
								"ud-wohnung-block-ud"
							)}
							className="wohnung-text"
						/>

						{/* Kontakte */}
						<div className="wohnung-contacts">
							<div className="wohnung-container">
								<UserIcon />

								<RichText
									tagName="div"
									value={nameAddress}
									onChange={(val) =>
										setAttributes({ nameAddress: val })
									}
									placeholder={__(
										"Name und Adresse eingeben",
										"ud-wohnung-block-ud"
									)}
									className="wohnung-nameaddress"
								/>
							</div>
							<div className="wohnung-container">
								<PhoneIcon />
								<RichText
									tagName="div"
									value={phone}
									onChange={(val) =>
										setAttributes({ phone: val })
									}
									placeholder={__(
										"Festnetznummer eingeben",
										"ud-wohnung-block-ud"
									)}
									className="wohnung-phone"
								/>
							</div>
							<div className="wohnung-container">
								<MobileIcon />
								<RichText
									tagName="div"
									value={mobile}
									onChange={(val) =>
										setAttributes({ mobile: val })
									}
									placeholder={__(
										"Handynummer eingeben",
										"ud-wohnung-block-ud"
									)}
									className="wohnung-mobile"
								/>
							</div>
							<div className="wohnung-container">
								<EnvelopeIcon />
								<RichText
									tagName="div"
									value={email}
									onChange={(val) =>
										setAttributes({ email: val })
									}
									placeholder={__(
										"E-Mail-Adresse eingeben",
										"ud-wohnung-block-ud"
									)}
									className="wohnung-email"
								/>
							</div>
							<div className="wohnung-container">
								<ExternalLinkIcon />
								<RichText
									tagName="div"
									value={url}
									onChange={(val) =>
										setAttributes({ url: val })
									}
									placeholder={__(
										"Webseite eingeben",
										"ud-wohnung-block-ud"
									)}
									className="wohnung-url"
								/>
							</div>

							{/* PDF Upload */}
							<div className="wohnung-container">
								<PdfIcon />
								<div className="pdf-upload-container">
									{pdf && (
										<RichText
											tagName="div"
											value={pdfLabel}
											onChange={(val) =>
												setAttributes({ pdfLabel: val })
											}
											placeholder={__(
												"Anzeigetext eingeben",
												"ud-wohnung-block-ud"
											)}
											className="wohnung-pdf-label"
										/>
									)}
									<MediaUploadCheck>
										<MediaUpload
											onSelect={onSelectPdf}
											allowedTypes={["application/pdf"]}
											value={pdf}
											render={({ open }) => (
												<div>
													{pdf ? (
														<p className="choosen-pdf">
															{pdf}
														</p>
													) : (
														<p className="choose-pdf">
															{__(
																"PDF auswählen",
																"ud-wohnung-block-ud"
															)}
														</p>
													)}
													<Button
														onClick={open}
														variant="secondary"
													>
														{__(
															"PDF hochladen / wählen",
															"ud-wohnung-block-ud"
														)}
													</Button>
												</div>
											)}
										/>
									</MediaUploadCheck>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
