import React, { useEffect, useState } from "react";
import { IContact, ITeamMember } from "../../types";
import { get } from "../../../../utils/ajax";
import { localRoutes, remoteRoutes } from "../../../../data/constants";
import { useHistory } from "react-router";
import NewGroupJoinRequestForm from "./NewGroupJoinRequestForm";
import XList, { ListItemData } from "../../../../components/list/XList";
import { getInitials } from "../../../../utils/stringHelpers";
import { Alert } from "@material-ui/lab";
import Box from "@material-ui/core/Box";

interface IProps {
  contactId: string;
  contact: IContact;
  isOwnProfile: boolean;
}

const ContactGroups = ({ isOwnProfile, contactId, contact }: IProps) => {
  const history = useHistory();
  const [data, setData] = useState<ITeamMember[]>([]);

  const handleView = (dt: any) => {
    history.push(localRoutes.groups + "/" + dt);
  };

  useEffect(() => {
    get(remoteRoutes.groupsMembership + `/?contactId=` + contactId, resp => {
      const groups: ITeamMember[] = [];
      // TODO @mariam, please change this to user array.map
      let i = 0;
      if (i === resp.length) {
        return;
      }
      while (i < resp.length) {
        const single = {
          id: resp[i].group.id,
          name: resp[i].group.name,
          details: resp[i].group.groupDetails,
          role: resp[i].role
        };
        groups.push(single);
        i++;
      }
      setData(groups);
    });
  }, [contactId]);

  const dataParser = (dt: any): ListItemData => {
    return {
      primaryText: dt.name,
      secondaryText: `Role: ${dt.role}`,
      avatar: getInitials(dt.name)
    };
  };

  return (
    <Box>
      {isOwnProfile ? (
        <Box pb={1}>
          <NewGroupJoinRequestForm contact={contact} />
        </Box>
      ) : null}
      <Box>
        {data.length === 0 ? (
          <Alert severity="info">No groups yet!</Alert>
        ) : (
          <XList
            data={data}
            onSelect={(dt: any) => handleView(dt.id)}
            parser={dataParser}
          />
        )}
      </Box>
    </Box>
  );
};

export default ContactGroups;
