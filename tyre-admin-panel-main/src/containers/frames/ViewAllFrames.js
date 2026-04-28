import React, { useEffect } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import Spinner from "../../components/layout/Spinner";
import {
    inputFields,
    PAGE_TITLE,
    PAGE_SINGLE_TITLE,
    LINK_URL,
    SIDEBAR_OPTIONS,
} from "../../shared/enums/frames_enum";
import SingleView from "../../components/common/SingleView";
import { useSingleFrame } from "../../shared/hooks/UseFrame";
const ViewFrame = ({ match }) => {
    const [data] = useSingleFrame(match.params.id);
    const { frame_loading, frame } = data;
    return (
        <div className="pace-done">
            <div>
                <Header />
                <BreadCrumb
                    title={PAGE_SINGLE_TITLE}
                    mainLinkTitle={PAGE_TITLE}
                    mainLinkUrl={LINK_URL}
                    activeLink="View"
                />
                {!frame_loading ? (
                    frame && (
                        <SingleView
                            data={frame}
                            inputFields={inputFields}
                            label={PAGE_SINGLE_TITLE}
                            link={LINK_URL}
                            id={frame._id}
                            SIDEBAR_OPTIONS={SIDEBAR_OPTIONS}
                        />
                    )
                ) : (
                    <div>
                        <Spinner />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewFrame;
