// ============================================
// Lesson 4.3: Creating & Updating Data (POST/PUT/DELETE)
// ============================================

import {
  HiOutlinePlusCircle,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineLightningBolt,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../components';
import CreateDataDemo from './CreateDataDemo';
import UpdateDataDemo from './UpdateDataDemo';
import DeleteDataDemo from './DeleteDataDemo';
import OptimisticUpdatesDemo from './OptimisticUpdatesDemo';
import CrudPlayground from './CrudPlayground';

export default function Lesson4_3(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="4" lesson="3" title="Creating & Updating Data (POST/PUT/DELETE)" />

      {/* Section 1: POST - Creating Data */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlinePlusCircle className="text-primary" size={20} />
            POST: Creating Data
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          To create new data, send a <strong className="text-primary">POST</strong> request with
          the data in the request body. The server typically returns the created item with its
          new <code className="text-secondary">id</code>.
        </p>
        <CreateDataDemo />
      </Section>

      {/* Section 2: PUT/PATCH - Updating Data */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlinePencil className="text-primary" size={20} />
            PUT/PATCH: Updating Data
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Use <strong className="text-primary">PUT</strong> to replace an entire resource, or{' '}
          <strong className="text-primary">PATCH</strong> to update specific fields. Both send
          the updated data in the request body.
        </p>
        <UpdateDataDemo />
      </Section>

      {/* Section 3: DELETE - Removing Data */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineTrash className="text-primary" size={20} />
            DELETE: Removing Data
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary">DELETE</strong> requests remove resources. Always
          confirm destructive actions and handle errors gracefully — you can't undo a delete!
        </p>
        <DeleteDataDemo />
      </Section>

      {/* Section 4: Optimistic vs Pessimistic Updates */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightningBolt className="text-primary" size={20} />
            Optimistic vs Pessimistic Updates
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary">Optimistic updates</strong> update the UI immediately
          and rollback on error. <strong className="text-secondary">Pessimistic updates</strong>{' '}
          wait for the server response. Each has trade-offs!
        </p>
        <OptimisticUpdatesDemo />
      </Section>

      {/* Section 5: CRUD Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            CRUD Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Put it all together! This todo app demonstrates all CRUD operations with proper loading
          states, error handling, and optimistic updates.
        </p>
        <CrudPlayground />
      </Section>

      {/* Takeaways */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineClipboardCheck className="text-primary" size={20} />
            Key Takeaways
          </span>
        }
      >
        <TakeawayList
          items={[
            'POST creates new resources — send data in the body, get back the created item with ID',
            'PUT replaces entire resources, PATCH updates specific fields only',
            'DELETE removes resources — always confirm destructive actions',
            'Optimistic updates feel faster but need rollback logic for errors',
            'Pessimistic updates are safer but feel slower to users',
            'Always disable buttons and show loading states during mutations',
            'Update local state after successful mutations to keep UI in sync',
          ]}
        />
      </Section>
    </div>
  );
}


