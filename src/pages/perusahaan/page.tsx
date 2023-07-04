import {
  Flex,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  IconButton,
  HStack,
  useDisclosure,
  Spacer,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon } from "@chakra-ui/icons";
import { EntityModal, useWarning } from "@/components";
import type { Perusahaan } from "@/types/models";
import { useEffect, useState } from "react";

const dataPerusahaan: Perusahaan[] = [
  {
    id: "1",
    nama: "Perusahaan 1",
    kode: "PRS",
    no_telp: "0231313",
    alamat: "Jl. Jalan",
  },
];

const PerusahaanPage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isCreate, setIsCreate] = useState(false);
  const { warning, WarningModal } = useWarning();
  const [entities, setEntities] = useState<Perusahaan[]>(dataPerusahaan);
  const [entityIndex, setEntityIndex] = useState(0);

  const openCreateModal = () => {
    setIsCreate(true);
    onOpen();
  };

  const openUpdateModal = (index: number) => {
    setEntityIndex(index);
    setIsCreate(false);
    onOpen();
  };

  const handleDelete = (index: number) => {
    warning({
      title: "Hapus Barang",
      description: "Apakah anda yakin ingin menghapus perusahaan ini?",
      onConfirm: () => {
        onClose();
      }, // TODO: API call
    });
  };

  useEffect(() => {
    // TODO: API call
  }, []);

  return (
    <>
      <WarningModal />
      <EntityModal
        isOpen={isOpen}
        onClose={onClose}
        entity={entities[entityIndex] || {}}
        entityType="perusahaan"
        isCreate={isCreate}
      />
      <Flex p={8} flexDir={"column"} w="calc(100% - 250px)" maxH="100vh" overflowY="auto" gap={8}>
        <HStack>
          <Heading>List Perusahaan</Heading>
          <Spacer />
          <IconButton aria-label="create" icon={<AddIcon />} onClick={openCreateModal} />
        </HStack>
        <Table>
          <Thead>
            <Tr>
              <Th>Nama Perusahaan</Th>
              <Th>Kode</Th>
              <Th>No. Telp</Th>
              <Th>Alamat</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataPerusahaan.map((perusahaan, i) => {
              return (
                <Tr>
                  <Td>{perusahaan.nama}</Td>
                  <Td>{perusahaan.kode}</Td>
                  <Td>{perusahaan.no_telp}</Td>
                  <Td>{perusahaan.alamat}</Td>
                  <Td>
                    <HStack>
                      <IconButton aria-label="edit" icon={<EditIcon />} onClick={() => openUpdateModal(i)} />
                      <IconButton
                        aria-label="delete"
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={() => handleDelete(i)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Flex>
    </>
  );
};

export default PerusahaanPage;
