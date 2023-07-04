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
import type { Barang } from "@/types/models";
import { useEffect, useState } from "react";

const dataBarang: Barang[] = [
  {
    id: "1",
    nama: "Barang 1",
    kode: "BRG1",
    stok: 10,
    harga: 10000,
    perusahaan: "Perusahaan 1",
  },
];

const BarangPage = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isCreate, setIsCreate] = useState(false);
  const { warning, WarningModal } = useWarning();
  const [entities, setEntities] = useState<Barang[]>(dataBarang);
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
      description: "Apakah anda yakin ingin menghapus barang ini?",
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
        entityType="barang"
        isCreate={isCreate}
      />
      <Flex p={8} flexDir={"column"} w="calc(100% - 250px)" maxH="100vh" overflowY="auto" gap={8}>
        <HStack>
          <Heading>List Barang</Heading>
          <Spacer />
          <IconButton aria-label="create" icon={<AddIcon />} onClick={openCreateModal} />
        </HStack>
        <Table>
          <Thead>
            <Tr>
              <Th>Nama Barang</Th>
              <Th>Kode</Th>
              <Th>Stok</Th>
              <Th>Harga</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataBarang.map((barang, i) => {
              return (
                <Tr>
                  <Td>{barang.nama}</Td>
                  <Td>{barang.kode}</Td>
                  <Td>{barang.stok}</Td>
                  <Td>{barang.harga}</Td>
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

export default BarangPage;
