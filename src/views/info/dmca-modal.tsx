import { FC } from "react";
import {
  Box,
  Heading,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Link,
} from "@chakra-ui/react";

type DMCAModalProps = {
  isOpen: boolean;
  onClose?: () => void;
};

const DMCAModal: FC<DMCAModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bgColor="white">
        <ModalBody fontSize="sm">
          <Box py="4" zIndex="40" rounded="lg" color="mirage.500">
            <Heading as="h2" mb="4">
              DMCA policy
            </Heading>
            <Text mb="4">
              This Digital Millennium Copyright Act policy (&quot;Policy&quot;)
              applies to the{" "}
              <Link
                isExternal
                rel="nofollow noopener"
                color="red.700"
                textDecor="underline"
                href="https://tvlix.online"
              >
                tvlix.online
              </Link>{" "}
              website (&quot;Website&quot; or &quot;Service&quot;) and any of
              its related products and services (collectively,
              &quot;Services&quot;) and outlines how this Website operator
              (&quot;Operator&quot;, &quot;we&quot;, &quot;us&quot; or
              &quot;our&quot;) addresses copyright infringement notifications
              and how you (&quot;you&quot; or &quot;your&quot;) may submit a
              copyright infringement complaint.
            </Text>
            <Text mb="4">
              Protection of intellectual property is of utmost importance to us
              and we ask our users and their authorized agents to do the same.
              It is our policy to expeditiously respond to clear notifications
              of alleged copyright infringement that comply with the United
              States Digital Millennium Copyright Act (&quot;DMCA&quot;) of
              1998, the text of which can be found at the U.S. Copyright Office{" "}
              <Link
                isExternal
                rel="noopener"
                color="red.700"
                textDecor="underline"
                href="https://www.copyright.gov"
              >
                website
              </Link>
              . This DMCA policy was created with the{" "}
              <Link
                isExternal
                rel="noopener"
                color="red.700"
                textDecor="underline"
                href="https://www.websitepolicies.com/dmca-policy-generator"
              >
                DMCA policy generator
              </Link>
              .
            </Text>
            <Heading as="h3" fontSize="md" mb="2">
              What to consider before submitting a copyright complaint
            </Heading>
            <Text mb="4">
              Before submitting a copyright complaint to us, consider whether
              the use could be considered fair use. Fair use states that brief
              excerpts of copyrighted material may, under certain circumstances,
              be quoted verbatim for purposes such as criticism, news reporting,
              teaching, and research, without the need for permission from or
              payment to the copyright holder. If you have considered fair use,
              and you still wish to continue with a copyright complaint, you may
              want to first reach out to the user in question to see if you can
              resolve the matter directly with the user.
            </Text>
            <Text mb="4">
              Please note that if you are unsure whether the material you are
              reporting is in fact infringing, you may wish to contact an
              attorney before filing a notification with us.
            </Text>
            <Text mb="4">
              We may, at our discretion or as required by law, share a copy of
              your notification or counter-notification with third parties. This
              may include sharing the information with the account holder
              engaged in the allegedly infringing activity or for publication.
              If you are concerned about your information being forwarded, you
              may wish to{" "}
              <Link
                isExternal
                rel="noopener"
                color="red.700"
                textDecor="underline"
                href="https://www.copyrighted.com/professional-takedowns"
              >
                hire an agent
              </Link>{" "}
              to report infringing material for you.
            </Text>
            <Heading as="h3" fontSize="md" mb="2">
              Notifications of infringement
            </Heading>
            <Text mb="4">
              If you are a copyright owner or an agent thereof, and you believe
              that any material available on our Services infringes your
              copyrights, then you may submit a written copyright infringement
              notification (&quot;Notification&quot;) using the contact details
              below pursuant to the DMCA. All such Notifications must comply
              with the DMCA requirements. You may refer to a{" "}
              <a
                target="_blank"
                href="https://www.websitepolicies.com/create/dmca-takedown-notice"
              >
                DMCA takedown notice generator
              </a>{" "}
              or other similar services to avoid making mistake and ensure
              compliance of your Notification.
            </Text>
            <Text mb="4">
              Filing a DMCA complaint is the start of a pre-defined legal
              process. Your complaint will be reviewed for accuracy, validity,
              and completeness. If your complaint has satisfied these
              requirements, our response may include the removal or restriction
              of access to allegedly infringing material.
            </Text>
            <Text mb="4">
              If we remove or restrict access to materials or terminate an
              account in response to a Notification of alleged infringement, we
              will make a good faith effort to contact the affected user with
              information concerning the removal or restriction of access, which
              may include a full copy of your Notification (including your name,
              address, phone, and email address).
            </Text>
            <Text mb="4">
              Notwithstanding anything to the contrary contained in any portion
              of this Policy, the Operator reserves the right to take no action
              upon receipt of a DMCA copyright infringement notification if it
              fails to comply with all the requirements of the DMCA for such
              notifications.
            </Text>
            <Heading as="h3" fontSize="md" mb="2">
              Changes and amendments
            </Heading>
            <Text mb="4">
              We reserve the right to modify this Policy or its terms relating
              to the Website and Services at any time, effective upon posting of
              an updated version of this Policy on the Website. When we do, we
              will revise the updated date at the bottom of this page.
            </Text>
            <Heading as="h3" fontSize="md" mb="2">
              Reporting copyright infringement
            </Heading>
            <Text mb="4">
              If you would like to notify us of the infringing material or
              activity, you may send an email to
              o&#107;&#110;oor&#97;p&#64;&#103;&#109;&#97;i&#108;.&#99;o&#109;.
            </Text>
            <Text mb="4">This document was last updated on March 25, 2021</Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DMCAModal;
